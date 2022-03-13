import asyncHandler from 'express-async-handler';
import Accommodation from '../models/accommodationModel.js';
import Booking from '../models/bookingModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// @desc    Fetch all accommodations
// @route   GET /api/accommodations
// @access  Public
const getAccommodations = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;

  if (page === -1) {
    const unpaginatedAccommodations = await Accommodation.find({}).populate(
      'host',
      'name'
    );
    return res.json({
      accommodations: unpaginatedAccommodations,
      page,
      pages: 0,
      locations: '',
    });
  }

  const pageSize = 10;
  const capacity = Number(req.query.capacity) || 1;
  const minPrice = Number(req.query.minPrice) || 0;
  const maxPrice = Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
  const city = req.query.city || '';
  const country = req.query.country || '';
  const rating = Number(req.query.rating) || 0;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Accommodation.countDocuments({
    name: { $regex: req.query.keyword ? req.query.keyword : '', $options: 'i' },
    capacity: { $gte: capacity },
    price: { $gte: minPrice, $lt: maxPrice },
    'location.city': { $regex: city, $options: 'i' },
    'location.country': { $regex: country, $options: 'i' },
    rating: { $gte: rating },
  });

  const distinctLocations = await Accommodation.distinct(
    'location',
    function (error, result) {
      if (error) {
        console.error(error);
      }
    }
  );

  const locationSet = new Set();

  distinctLocations.forEach((location) => {
    locationSet.add(location.country);
    locationSet.add(location.city + '+' + location.country);
  });

  const locations = [...locationSet];

  const accommodations = await Accommodation.find({ ...keyword })
    .where('capacity')
    .gte(capacity)
    .where('price')
    .gte(minPrice)
    .lt(maxPrice)
    .where({
      'location.city': { $regex: city, $options: 'i' },
    })
    .where({
      'location.country': { $regex: country, $options: 'i' },
    })
    .where('rating')
    .gte(rating)
    .populate('host', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    accommodations,
    page,
    pages: Math.ceil(count / pageSize),
    locations,
  });
});

// @desc    Get current user's accommodations
// @route   GET /api/accommodations/myaccommodations
// @access  Private
const getMyAccommodations = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const obj = mongoose.Types.ObjectId(req.user.id);
  const accommodations = await Accommodation.find({ host: obj });

  const count = await Accommodation.countDocuments({ host: obj });

  res.json({ accommodations, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single accommodation
// @route   GET /api/accommodations/:id
// @access  Public
const getAccommodationById = asyncHandler(async (req, res) => {
  const populateAmenities =
    req.query.populateAmenities === 'true' ? true : false;

  let accommodation = await Accommodation.findById(req.params.id).populate(
    'reviews.user',
    'name'
  );

  if (accommodation) {
    if (populateAmenities) {
      accommodation = await Accommodation.findById(req.params.id)
        .populate('reviews.user', 'name')
        .populate('amenities');
    }
    res.json(accommodation);
  } else {
    res.status(404);
    throw new Error('Accommodation not found');
  }
});

// @desc    Delete accommodation
// @route   DELETE /api/accommodations/:id
// @access  Private/admin
const deleteAccommodation = asyncHandler(async (req, res) => {
  const accommodation = await Accommodation.findById(req.params.id);

  if (accommodation) {
    if (accommodation.host.toString() !== req.user.id && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to delete this accommodation.');
    }
    await accommodation.remove();
    res.json({ message: 'Accommodation deleted' });
  } else {
    res.status(404);
    throw new Error('Accommodation not found');
  }
});

// @desc    Create accommodation
// @route   POST /api/accommodations
// @access  Private/admin
const createAccommodation = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Not authorized to create an accommodation.');
  }

  const { name, price, image, description, location, capacity, amenities } =
    req.body;

  const accommodation = await Accommodation.create({
    name,
    price,
    host: req.user.id,
    image,
    description,
    location,
    reviews: [],
    rating: 0,
    numReviews: 0,
    capacity,
    amenities,
  });

  const createdAccommodation = await accommodation
    .save()
    .catch((err) => console.error(err));
  res.status(201).json(createdAccommodation);
});

// @desc    Update accommodation
// @route   PUT /api/accommodations/:id
// @access  Private
const updateAccommodation = asyncHandler(async (req, res) => {
  const accommodation = await Accommodation.findById(req.params.id);

  if (accommodation) {
    if (accommodation.host.toString() !== req.user.id && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to update this accommodation.');
    }

    const { name, price, image, description, location, capacity, amenities } =
      req.body;

    accommodation.name = name;
    accommodation.price = price;
    accommodation.image = image;
    accommodation.description = description;
    accommodation.location.city = location.city;
    accommodation.location.country = location.country;
    accommodation.capacity = capacity;
    accommodation.amenities = amenities;

    const updatedAccommodation = await accommodation
      .save()
      .catch((err) => console.error(err));
    res.status(201).json(updatedAccommodation);
  } else {
    res.status(404);
    throw new Error('Accommodation not found');
  }
});

// @desc    Get taken dates
// @route   GET /api/accommodations/:id/taken
// @access  Public
const getTakenDates = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    accommodation: req.params.id,
    status: { $ne: 'CANCELLED' },
  });
  let dates = new Set();

  if (bookings) {
    bookings.forEach((booking) => {
      if (booking.status !== 'CANCELLED') {
        const fromDate = new Date(booking.bookedFrom);
        const toDate = new Date(booking.bookedTo);
        let temp = new Date(fromDate);
        while (true) {
          if (
            temp.getFullYear() === toDate.getFullYear() &&
            temp.getMonth() === toDate.getMonth() &&
            temp.getDate() === toDate.getDate()
          ) {
            break;
          } else {
            dates = dates.add(new Date(temp).toISOString());
            temp.setDate(temp.getDate() + 1);
          }
        }
      }
    });
  }

  dates = [...dates].sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  const checkoutOnlyDates = new Set();
  dates.forEach((date, index) => {
    if (
      (!dates.includes(
        new Date(
          new Date(date).setDate(new Date(date).getDate() - 1)
        ).toISOString()
      ) &&
        dates.includes(
          new Date(
            new Date(date).setDate(new Date(date).getDate() + 1)
          ).toISOString()
        )) ||
      (!dates.includes(
        new Date(
          new Date(date).setDate(new Date(date).getDate() - 1)
        ).toISOString()
      ) &&
        !dates.includes(
          new Date(
            new Date(date).setDate(new Date(date).getDate() + 1)
          ).toISOString()
        ))
    ) {
      checkoutOnlyDates.add(date);
      dates.splice(index, 1);
    }
  });

  res.json({
    takenDates: [...dates],
    checkoutOnlyDates: [...checkoutOnlyDates],
  });
});

export {
  getAccommodations,
  getAccommodationById,
  deleteAccommodation,
  createAccommodation,
  updateAccommodation,
  getMyAccommodations,
  getTakenDates,
};
