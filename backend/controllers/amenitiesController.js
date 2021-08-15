import asyncHandler from 'express-async-handler';
import Amenity from '../models/amenityModel.js';

// @desc    Fetch all amenities
// @route   GET /api/amenities
// @access  Public
const getAmenities = asyncHandler(async (req, res) => {
  const amenities = await Amenity.find({});

  res.json(amenities);
});

// @desc    Create amenity
// @route   POST /api/amenities
// @access  Private/admin
const createAmenity = asyncHandler(async (req, res) => {
  const { name, icon } = req.body;

  const amenityExists = await Amenity.findOne({ name });

  if (amenityExists) {
    res.status(400);
    throw new Error('Amenity already exists');
  }

  const amenity = await Amenity.create({
    name,
    icon,
  });

  if (amenity) {
    res.status(201).json(amenity);
  } else {
    res.status(400);
    throw new Error('Invalid amenity data');
  }
});

// @desc    Delete amenity
// @route   DELETE /api/amenities/:id
// @access  Private/admin
const deleteAmenity = asyncHandler(async (req, res) => {
  const amenity = await Amenity.findById(req.params.id);

  if (amenity) {
    await amenity.remove();
    res.json({ message: 'Amenity removed' });
  } else {
    res.status(404);
    throw new Error('Amenity not found');
  }
});

export { getAmenities, createAmenity, deleteAmenity };
