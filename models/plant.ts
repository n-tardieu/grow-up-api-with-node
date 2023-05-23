import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    variety: {
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
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// Utilisation de populate pour récupérer les objets complets lors de la requête
eventSchema.pre('find', function (next) {
    this.populate('variety')
        .populate({
            path: 'location',
            select: '-user'
        })
        .populate({
            path: 'user',
            select: '-password',
        });
    next();
});

// Utilisation de populate pour récupérer l'objet complet lors de la requête findOne
eventSchema.pre('findOne', function (next) {
    this.populate('variety')
        .populate({
            path: 'location',
            select: '-user'
        })
        .populate({
            path: 'user',
            select: '-password',
        });
    next();
});

eventSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

export default mongoose.model('Plant', eventSchema);
