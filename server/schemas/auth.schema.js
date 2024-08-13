import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({ required_error: 'Username is required'}),
    email: z.string({ required_error: "Email is required"}).email({ message: 'Invalid email'}),
    phoneNumber: z.string({ required_error: "Phone number is required"}).min(10, { message: 'Phone number must be at least 10 characters long'}),
    password: z.string({ required_error: "Passqord is required"}).min(6, { message: 'Password must be at least 6 characters long'})
});

export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required"}).email({ message: 'El correo no es valido'}),
    password: z.string({ required_error: "Password is required"}).min(8, { message: 'La contraseña debe tener al menos 8 caracteres'})
});