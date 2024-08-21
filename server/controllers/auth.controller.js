import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const {username, email, phoneNumber, password} = req.body;

    try {
        const userFound = await User.findOne({email});
        if(userFound) return res.status(400).json(['El correo ya está en uso']);
        
        //encriptando contraseña
        const passHash = await bcrypt.hash(password, 10)

        //Guardando los datos
        const newUser = new User({ username, email, phoneNumber, password: passHash })
        
        const userSaved = await newUser.save();
        
        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none', // Necesario para permitir la cookie en diferentes dominios
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        //Enviando datos utilizados en el frontend
        res.json({
            id:userSaved._id,
            username:userSaved.username,
            email:userSaved.email,
            phoneNumber: userSaved.phoneNumber,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        //Buscando usuario
        const userFound = await User.findOne({email});

        if(!userFound) return res.status(400).json({message: 'Usuario no encontrado'});

        //Comparando contraseñas
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json({message: 'Contraseña incorrecta'});

        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none', // Necesario para permitir la cookie en diferentes dominios
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        //Enviando datos utilizados en el frontend
        res.json({
            id:userFound._id,
            username:userFound.username,
            email:userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', {expires: new Date(0)})
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({message: 'Usuario no encontrado'});

    return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        phoneNumber: userFound.phoneNumber,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}

export const updateProfile = async (req, res) => {
    try {
        const { email } = req.body; // Asume que el correo electrónico se envía en el cuerpo de la solicitud
        const userId = req.params.id; // El ID del usuario que se está actualizando

        // Primero, verifica si el correo electrónico ya está en uso por otro usuario
        const checkEmail = await User.findOne({ email, _id: { $ne: userId } });
        if (checkEmail) {
            // Si el correo electrónico ya está en uso, devuelve un error
            return res.status(400).json({ message: 'Actualización no completada: El correo ya está en uso' });
        }

        // Si el correo electrónico no está en uso, procede a actualizar el usuario
        const userFound = await User.findByIdAndUpdate(userId, req.body, {
            new: true // Para que devuelva el objeto actualizado
        });

        if (!userFound) {
            // Si no se encuentra el usuario, devuelve un error
            return res.status(404).json({ message: 'Actualización no completada: Usuario no encontrado' });
        }

        // Devuelve el usuario actualizado
        res.json(userFound);
    } catch (error) {
        return res.status(404).json({message: 'Error, usuario no encontrado (updateTask)'});
    }
}

export const changePassword = async (req, res) => {
    const { oldPass, password } = req.body;
    
    try {
        const userId = req.user.id; // Asumiendo que el ID del usuario está disponible a través de la autenticación

        // Buscar el usuario por ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña actual
        const isMatch = await bcrypt.compare(oldPass, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        
        // Actualizar la contraseña en la base de datos;
        await user.save();

        res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ message: 'El correo electrónico no existe en la base de datos' });
        }

        return res.status(200).json({message: 'Email sent'});        
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export const resetPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        
        if (!userFound) {
            return res.status(404).json({ message: 'El correo electrónico no existe en la base de datos' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        userFound.password = hashedPassword;
        await userFound.save();

        return res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export const deleteAccount = async (req, res) => {
    const { id } = req.params;
    
    try {
        const userFound = await User.findByIdAndDelete(id);
        if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.cookie('token', '', {expires: new Date(0)})
        
        return res.status(200).json({ message: 'Cuenta eliminada' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if(!token) return res.status(401).json({message: 'Acceso denegado'});

    jwt.verify(token,TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: 'Acceso denegado'});
        const userFound = await User.findById(user.id)
        
        if(!userFound) return res.status(400).json({message: 'Usuario no encontrado'});

        return res.json({
            id:userFound._id,
            username:userFound.username,
            email:userFound.email,
            phoneNumber: userFound.phoneNumber,
        })
    })
}