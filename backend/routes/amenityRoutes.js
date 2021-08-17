import express from 'express';
import {
  getAmenities,
  createAmenity,
  deleteAmenity,
} from '../controllers/amenitiesController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAmenities).post(protect, isAdmin, createAmenity);
router.route('/:id').delete(protect, isAdmin, deleteAmenity);

export default router;
