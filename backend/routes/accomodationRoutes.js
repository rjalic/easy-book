import express from 'express';
import {
  getAccomodationById,
  getAccomodations,
  deleteAccomodation,
  createAccomodation,
  updateAccomodation,
  createAccomodationReview,
} from '../controllers/accomodationController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getAccomodations)
  .post(protect, isAdmin, createAccomodation);

router.route('/:id/reviews').post(protect, createAccomodationReview);

router
  .route('/:id')
  .get(getAccomodationById)
  .delete(protect, isAdmin, deleteAccomodation)
  .put(protect, isAdmin, updateAccomodation);

export default router;
