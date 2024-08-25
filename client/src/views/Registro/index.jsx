import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import ArrowBack from '../../components/ArrowBack';

import styles from './Registro.module.css';

const Registro = () => {
    const { handleSubmit, register, watch, formState: {errors} } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        }
    });

    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    let navigate = useNavigate();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    
    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordsMatch(password === confirmPassword);
        }
    }, [password, confirmPassword]);

    const handleFormSubmit = async (values) => {
        signup(values);
    };

    useEffect(() => {
        if (isAuthenticated) navigate('/Inicio');
    }, [isAuthenticated]);

    return (
        <div>
            <ArrowBack dir='/'/>

            <div className={styles.containerForm}>
                <h2 className={styles.pageTitle}> Crea tu cuenta </h2>

                {registerErrors.map((error, i) => (
                    <div key={i} className={styles.errorMessage}>
                        {error}
                    </div>
                ))}

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <label className={styles.label}>
                        Nombre de usuario
                        <input type='text' {...register('username', { required: 'Nombre requerido'})}/>

                        <p className={styles.errorMessage}> {errors.username?.message} </p>
                    </label>
                    
                    <label className={styles.label}>
                        Correo
                        <input type='email' {...register('email', { required: 'Email requerido'})} />

                        <p className={styles.errorMessage}> {errors.email?.message} </p>
                    </label>
                    
                    <label className={styles.label}>
                        Celular
                        <input type='number' {...register('phoneNumber', { required: 'Número requerido', minLength: {value: 10, message: 'Deben ser 10 digítos'}})}/>
                    
                        <p className={styles.errorMessage}> {errors.phoneNumber?.message} </p>
                    </label>
                    
                    <label className={styles.label}>
                        Contraseña
                        <input type='password' {...register('password', { required: 'Contraseña requerida', minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }})} />

                        <p className={styles.errorMessage}> {errors.password?.message} </p>
                    </label>
                    
                    <label className={styles.label}>
                        Confirmar contraseña
                        <input type='password' {...register('confirmPassword', { required: 'No has confirmado la contraseña', validate: value => value === password || 'Las contraseñas no coinciden'})} />
                    
                        <p className={styles.errorMessage}> {errors.confirmPassword?.message} </p>

                        {passwordsMatch && <p className={styles.passMatch}>Las contraseñas coinciden</p>}
                    </label>

                    <p className={styles.aviso}> Dando click al boton Crear cuenta, <br />estás de acuerdo con el <a href={'/AvisoPrivacidad'} target="_blank" rel="noopener noreferrer"> Aviso de privacidad</a></p>
                    
                    <button type="submit" className={styles.submitButton}> Crear cuenta </button>
                </form>
            </div>
        </div>
    )
}

export default Registro;