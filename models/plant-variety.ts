import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: String,
    isInHome: String,
    light: String,
    humidity: String,
    temperature: String
})

eventSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

export default mongoose.model('PlantVariety', eventSchema);
