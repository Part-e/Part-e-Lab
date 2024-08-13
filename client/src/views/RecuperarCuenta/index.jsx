import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ArrowBack from '../../components/ArrowBack';
import toast from 'react-hot-toast';

import styles from './RecuperarCuenta.module.css';

const RecuperarContrasena = () => {
    let navigate = useNavigate();
    const { handleSubmit, watch, register, formState: {errors}} = useForm();
    const { forgotPassword, resetPassword, errors: errorsForm } = useAuth();
    const [showPasswordFields, setShowPasswordFields] = useState(false); // Estado para controlar la visibilidad de los campos de contraseña
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [emailEntered, setEmailEntered] = useState(''); // Estado para almacenar el correo electrónico ingresado
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    
    const handleCheckEmail = async (data) => {
        try {
            await forgotPassword(data);
            setShowPasswordFields(true);
            setEmailEntered(data.email);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChangePassword = async (data) => {
        try {
            console.log(data);
            await resetPassword(data);
            toast.success('Contraseña cambiada con éxito');
            setTimeout(() => {
                navigate('/InicioSesion');
            } , 2000);
        } catch (error) {
            toast.error('Error al cambiar la contraseña');
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordsMatch(password === confirmPassword);
        }else{
            setPasswordsMatch(false);
        }
    }, [password, confirmPassword]);

    return (
        <div>
            <ArrowBack dir='/InicioSesion' />
            
            <div className={styles.containerForm}>
                <h2 className={styles.pageTitle}> Recupera tu cuenta </h2>

                <p className={styles.text}> Ingresa el email con el que te registraste para recuperar tu cuenta </p>

                {/* Formulario para ingresar el correo electrónico */}
                {!showPasswordFields && (
                    <form onSubmit={handleSubmit(handleCheckEmail)}>
                        <label className={styles.label}>
                            Email 
                            <input type='email' {...register('email', { required: "Debes ingresar tu email" })} disabled={showPasswordFields}/> {/* Deshabilita el campo de correo si los campos de contraseña están visibles */}
                        
                            <p className={styles.errorMessage}> {errors.email?.message} </p>    
                        </label>
                        
                        {errorsForm.map((error, i) => (
                            <div key={i} className={styles.errorMessage}>
                                {error}
                            </div>
                        ))}

                        <button type="submit" className={styles.button}> Continuar </button>
                    </form>
                )}

                {/* Formulario para cambiar la contraseña */}
                {showPasswordFields && (
                    <form onSubmit={handleSubmit(handleChangePassword)}>
                        <label className={styles.label}>
                            Correo electrónico
                            <input type='email' className={styles.readOnly} value={emailEntered} readOnly /> {/* Campo de correo electrónico de solo lectura */}
                        </label>

                        <label className={styles.label}>
                            Nueva contraseña
                            <input type='password' {...register('password', { required: "Ingresa tu nueva contraseña",  minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }})} />
                        </label>
                        <p className={styles.errorMessage}> {errors.password?.message} </p>

                        <label className={styles.label}>
                            Confirma tu nueva contraseña
                            <input type='password' {...register('confirmPassword', { required: 'No has confirmado la contraseña', validate: value => value === password || 'Las contraseñas no coinciden'})} />
                        </label>
                        <p className={styles.errorMessage}> {errors.confirmPassword?.message} </p>
                        {passwordsMatch && password && confirmPassword && <p className={styles.passMatch}>Las contraseñas coinciden</p>}

                        {errorsForm.map((error, i) => (
                            <div key={i} className={styles.errorMessage}>
                                {error}
                            </div>
                        ))}

                        <button type="submit" className={styles.button}> Cambiar contraseña </button>            
                    </form>
                )}
            </div>
        </div>
    );
}

export default RecuperarContrasena;