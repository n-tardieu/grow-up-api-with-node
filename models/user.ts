import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    firstname: {
        type: String, required: [true, "can't be blank"],
    },
    lastname: {
        type: String, required: [true, "can't be blank"],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        index: true,
    },
    role: {
        type: String,
        required: [true, "can't be blank"],
    },
    password: {
        type: String, required: [true, "can't be blank"],
    },
}, { timestamps: true });


eventSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

export default mongoose.model('User', eventSchema);
