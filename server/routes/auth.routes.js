import { Router } from 'express';
import { login, register, logout, profile, verifyToken, updateProfile, changePassword, forgotPassword, resetPassword, deleteAccount } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile/:id', authRequired, profile)
router.put('/profile/:id', authRequired, updateProfile);
router.put('/updatePassword/:id', authRequired, changePassword);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);
router.delete('/deleteAccount/:id', authRequired, deleteAccount);

export default router;