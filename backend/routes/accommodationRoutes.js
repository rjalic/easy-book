import express from 'express';
import {
  getAccommodationById,
  getAccommodations,
  deleteAccommodation,
  createAccommodation,
  updateAccommodation,
  getMyAccommodations,
  getTakenDates,
} from '../controllers/accommodationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAccommodations).post(protect, createAccommodation);
router.route('/myaccommodations').get(protect, getMyAccommodations);
router.route('/:id/taken').get(getTakenDates);

router
  .route('/:id')
  .get(getAccommodationById)
  .delete(protect, deleteAccommodation)
  .put(protect, updateAccommodation);

export default router;
