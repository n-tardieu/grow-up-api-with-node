import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: String,
    recommendedWateringFrequency: String,
    lastWateringDate: String
})

eventSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

export default mongoose.model('Plant', eventSchema);
