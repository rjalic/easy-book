import express from 'express';
import {
  createBooking,
  createReview,
  getBookingById,
  getBookings,
  getMyBookings,
  getOwnerBookings,
  updateBookingToPaid,
  lockDateRange,
  unlockDateRange,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/owner').get(protect, getOwnerBookings);
router
  .route('/')
  .post(protect, createBooking)
  .get(protect, isAdmin, getBookings);
router.route('/mybookings').get(protect, getMyBookings);
router
  .route('/lock/:id')
  .post(protect, lockDateRange)
  .delete(protect, unlockDateRange);
router.route('/cancel/:id').put(protect, cancelBooking);
router.route('/:id/review').post(protect, createReview);
router.route('/:id').get(protect, getBookingById);
router.route('/:id/pay').put(protect, updateBookingToPaid);

export default router;
