import asyncHandler from 'express-async-handler';
import Accomodation from '../models/accomodationModel.js';

// @desc    Fetch all accomodations
// @route   GET /api/accomodations
// @access  Public
const getAccomodations = asyncHandler(async (req, res) => {
  const accomodations = await Accomodation.find({}).populate('host', 'name');

  res.json(accomodations);
});

// @desc    Fetch single accomodation
// @route   GET /api/accomodations/:id
// @access  Public
const getAccomodationById = asyncHandler(async (req, res) => {
  const accomodation = await Accomodation.findById(req.params.id);

  if (accomodation) {
    res.json(accomodation);
  } else {
    res.status(404);
    throw new Error('Accomodation not found');
  }
});

// @desc    Delete accomodation
// @route   DELETE /api/accomodations/:id
// @access  Private/admin
const deleteAccomodation = asyncHandler(async (req, res) => {
  const accomodation = await Accomodation.findById(req.params.id);

  if (accomodation) {
    await accomodation.remove();
    res.json({ message: 'Accomodation deleted' });
  } else {
    res.status(404);
    throw new Error('Accomodation not found');
  }
});

// @desc    Create accomodation
// @route   POST /api/accomodations
// @access  Private/admin
const createAccomodation = asyncHandler(async (req, res) => {
  const accomodation = new Accomodation({
    name: 'Sample name',
    price: 0,
    host: req.user._id,
    image: '/images/placeholder.png',
    description: 'Sample description',
    location: {
      city: 'Sample city',
      country: 'Sample country',
    },
    reviews: [],
    rating: 0,
    numReviews: 0,
    capacity: 1,
    amenities: [],
  });

  const createdAccomodation = await accomodation.save();
  res.status(201).json(createdAccomodation);
});

// @desc    Update accomodation
// @route   PUT /api/accomodations/:id
// @access  Private/admin
const updateAccomodation = asyncHandler(async (req, res) => {
  const accomodation = await Accomodation.findById(req.params.id);

  if (accomodation) {
    const { name, price, image, description, location, capacity, amenities } =
      req.body;

    accomodation.name = name;
    accomodation.price = price;
    accomodation.image = image;
    accomodation.description = description;
    accomodation.location.city = location.city;
    accomodation.location.country = location.country;
    accomodation.capacity = capacity;
    accomodation.amenities = amenities;

    const updatedAccomodation = await accomodation
      .save()
      .catch((err) => console.error(err));
    res.status(201).json(updatedAccomodation);
  } else {
    res.status(404);
    throw new Error('Accomodation not found');
  }
});

export {
  getAccomodations,
  getAccomodationById,
  deleteAccomodation,
  createAccomodation,
  updateAccomodation,
};
