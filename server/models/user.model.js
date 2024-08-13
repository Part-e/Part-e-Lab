// Crear una tabla para mongoDB
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true //Quitar espacios en blanco
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true //No se pueden repetir
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema);