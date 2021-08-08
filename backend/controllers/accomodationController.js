import asyncHandler from 'express-async-handler';
import Accomodation from '../models/accomodationModel.js';

// @desc    Fetch all accomodations
// @route   GET /api/accomodations
// @access  Public
const getAccomodations = asyncHandler(async (req, res) => {
  const accomodations = await Accomodation.find({});

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

export { getAccomodations, getAccomodationById };
