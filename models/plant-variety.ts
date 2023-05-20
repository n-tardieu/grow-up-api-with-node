import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    waterFrequency: {
      type: Number,
      required: true,
    },
    lightRequirements: {
      type: String,
      required: true,
    },
    optimalTemperature: {
      type: Number,
      required: true,
    },
  });

eventSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

export default mongoose.model('PlantVariety', eventSchema);
