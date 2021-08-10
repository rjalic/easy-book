import express from 'express';
import {
  createBooking,
  getBookingById,
  getBookings,
  getMyBookings,
  updateBookingToPaid,
} from '../controllers/bookingController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, createBooking)
  .get(protect, isAdmin, getBookings);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id').get(protect, getBookingById);
router.route('/:id/pay').put(protect, updateBookingToPaid);

export default router;
