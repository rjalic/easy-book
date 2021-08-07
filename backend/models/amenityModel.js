import mongoose from 'mongoose';

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

const Amenity = mongoose.model('Amenity', amenitySchema);

export default Amenity;
