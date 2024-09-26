import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest, getUserData, updateProfileRequest, updatePasswordRequest, forgotPasswordRequest, resetPasswordRequest, deleteAccountRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            
            const { token } = res.data;
            
            // Guardar el token en localStorage
            localStorage.setItem('token', token);

            // Guardar el token también en cookies si aún lo necesitas
            Cookies.set('token', token);
            
            setIsAuthenticated(true);
            setUser(res.data)
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            
            const { token } = res.data;
            
            // Guardar el token en localStorage
            localStorage.setItem('token', token);

            // Guardar el token también en cookies si aún lo necesitas
            Cookies.set('token', token);

            setIsAuthenticated(true);
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const logout = () => {
        Cookies.remove('token');
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        setIsAuthenticated(false);
        setUser(null);
    }

    const getUser = async (id) => {
        try {
            const res = await getUserData(id);
            return res.data;
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    }

    const updateProfile = async (id, task) => {
        try {
            const res = await updateProfileRequest(id, task);
            return res.data;
        } catch (error) {
            setErrors([error.response.data.message]);
            throw error;
        }
    }

    const updatePassword = async (id, pass) => {
        try {
            const res = await updatePasswordRequest(id, pass);
            return res.data;
        } catch (error) {
            setErrors([error.response.data.message]);
            throw error;
        }
    }

    const forgotPassword = async (email) => {
        try {
            const res = await forgotPasswordRequest(email);
            return res.data;
        } catch (error) {
            setErrors([error.response.data.message]);
            throw error;
        }
    }

    const resetPassword = async (data) => {
        try {
            const res = await resetPasswordRequest(data);
            return res.data;
        } catch (error) {
            setErrors([error.response.data.message]);
            throw error;
        }
    }

    const deleteAccount = async (id) => {
        try {
            const res = await deleteAccountRequest(id);
            Cookies.remove('token');
            setIsAuthenticated(false);
            setUser(null);
            return res.data;
        } catch (error) {
            setErrors([error.response.data.message]);
            throw error;
        }
    }

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin(){
            // Recupera el token de localStorage
            const token = localStorage.getItem('token');

            if(!token){ //Comprobando si hay token
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            
            try {
                const res = await verifyTokenRequest(token)
                if(!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }    
                setIsAuthenticated(true);
                setUser(res.data);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
            
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, signin, logout, loading, user, isAuthenticated, errors, getUser, updateProfile, updatePassword, forgotPassword, resetPassword, deleteAccount}}>
            {children}
        </AuthContext.Provider>
    );
}