import mongoose from 'mongoose';


import PlantVariety from './models/plant-variety.model.js';


import seedPlantVarieties from './data/plant-varieties.seed.js';
import seedUsers from './data/users.seed.js';
import seedLocationTypes from './data/location-types.seed.js';
import User from './models/user.model.js';
import LocationType from './models/location-type.model.js';

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoDb = process.env.MONGO_DB || 'my-database';

const mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoUri, options)
  .then(() => {
    console.log('Connected to database');

  })
  .catch((err) => console.log('Error connecting database', err.message));

const seedDB = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(seedUsers)
  
    await LocationType.deleteMany({});
    await LocationType.insertMany(seedLocationTypes)
    
    await PlantVariety.deleteMany({});
    await PlantVariety.insertMany(seedPlantVarieties);
    console.log('Data inserted successfully');
  } catch (e) {
    console.log('Error seeding database', e);
  }
}

seedDB().then(() => {
  mongoose.connection.close().then(() => {
    console.log('Connection closed to database');
  })

})



