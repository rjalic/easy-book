import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Accommodation from '../models/accommodationModel.js';
import Booking from '../models/bookingModel.js';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre('remove', async function (next) {
  try {
    await Booking.deleteMany({
      user: mongoose.Types.ObjectId(this._id),
    });
    await Accommodation.deleteMany({
      host: mongoose.Types.ObjectId(this._id),
    });
  } catch (error) {
    console.error(error);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
