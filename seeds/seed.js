import mongoose from 'mongoose';


import seedLocationTypes from './data/location-types.seed.js';
import seedLocations from './data/location.seed.js';
import seedPlantVarieties from './data/plant-varieties.seed.js';
import seedPlant from './data/plant.seed.js';
import seedUsers from './data/users.seed.js';

import LocationType from './models/location-type.model.js';
import Location from './models/location.model.js';
import PlantVariety from './models/plant-variety.model.js';
import Plant from './models/plant.model.js';
import User from './models/user.model.js';

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

    await Location.deleteMany({});
    await Plant.deleteMany({});

    const userIdList = await User.find().select('id');
    const plantVarietyIdList = await PlantVariety.find().select('id');

    for (const userId of userIdList) {
      for (const location of seedLocations) {
        const { type, user, name, ...props } = location;

        const locationType = await LocationType.findOne({ name: name });

        const newLocation = new Location({
          type: locationType.id,
          user: userId.id,
          name: name,
          ...props,
        });

        const locationSaved = await newLocation.save();
        const locationSavedId = locationSaved._id

        // Ajouter deux plantes pour l'emplacement
        for (const [index, plant] of plantVarietyIdList.entries()) {

          const newPlant = new Plant({
            name: 'Plante ' + (index + 1),
            description: 'Description de la plante ' + (index + 1),
            lastWatered: new Date(),
            variety: plant._id,
            location: locationSavedId,
            user: userId.id,
          });

          await newPlant.save();
        }
      }

    }


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



