import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LocationType',
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    lightExposure: {
        type: String,
        required: true,
    },
    ventilation: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

eventSchema.pre('find', function (next) {
    this.populate('type')
        .populate({
            path: 'user',
            select: '-password -id',
        });
    next();
});

eventSchema.pre('findOne', function (next) {
    this.populate('type')
        .populate({
            path: 'user',
            select: '-password -id',
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

export default mongoose.model('Location', eventSchema);
