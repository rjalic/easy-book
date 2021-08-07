import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import amenities from './data/amenities.js';
import accomodations from './data/accomodations.js';
import User from './models/userModel.js';
import Amenity from './models/amenityModel.js';
import Booking from './models/bookingModel.js';
import Accomodation from './models/accomodationModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Booking.deleteMany();
    await Accomodation.deleteMany();
    await User.deleteMany();
    await Amenity.deleteMany();

    const createdUsers = await User.insertMany(users);
    await Amenity.insertMany(amenities);

    const sampleAccomodations = accomodations.map((accomodation) => {
      const randomidx = Math.floor(
        Math.random() * (createdUsers.length - 1) + 1
      );
      console.log(
        `Mapping accomodation '${accomodation.name}' to user '${createdUsers[randomidx].name}'`
      );
      return {
        ...accomodation,
        host: createdUsers[randomidx]._id,
      };
    });
    await Accomodation.insertMany(sampleAccomodations);

    console.log('Data imported...');
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Booking.deleteMany();
    await Accomodation.deleteMany();
    await User.deleteMany();
    await Amenity.deleteMany();

    console.log('Data destroyed...');
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
