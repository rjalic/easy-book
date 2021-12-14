import mongoose from 'mongoose';
import Accommodation from '../models/accommodationModel.js';

const amenitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

amenitySchema.pre('remove', async function (next) {
  try {
    await Accommodation.updateMany(
      {},
      { $pull: { amenities: { $in: mongoose.Types.ObjectId(this._id) } } },
      { multi: true }
    );
  } catch (error) {
    console.log(error);
  }
  next();
});

const Amenity = mongoose.model('Amenity', amenitySchema);

export default Amenity;
