import mongoose from 'mongoose';
// import { RolesEnum } from '../constants/enums/role.enum.js'

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        // TODO: TEST enum 
        //   enum: Object.values(RolesEnum)
        default: 'user',
    },
    plants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
    }],
});


eventSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

export default mongoose.model('User', eventSchema);
