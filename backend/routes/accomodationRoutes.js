import express from 'express';
import {
  getAccomodationById,
  getAccomodations,
} from '../controllers/accomodationController.js';

const router = express.Router();

router.route('/').get(getAccomodations);

router.route('/:id').get(getAccomodationById);

export default router;
