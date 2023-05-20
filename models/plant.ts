import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    plantVariety: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlantVariety',
        required: true,
    },
    lastWatered: {
        type: Date,
        required: true,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
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

export default mongoose.model('Plant', eventSchema);
