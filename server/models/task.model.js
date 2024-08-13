import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    pin: {
        type: String,
        required: true,
        unique: true
    },
    nameEvent: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    info: {
        type: String,
        default: Date.now
    },
    startEvent: {
        type: Date,
        required: true
    },
    endEvent: {
        type: Date
    },
    location: {
        type: String,
        required: true
    },
    menu: {
        type: String
    },
    importantInfo: {
        type: String
    },
    check: {
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Task', taskSchema);