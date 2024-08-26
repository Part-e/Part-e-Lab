import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

import ArrowBack from '../../components/ArrowBack';

import styles from './InicioSesion.module.css';

const InicioSesion = () => {
    const { handleSubmit, register, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    
    let navigate = useNavigate();
    const { signin,  isAuthenticated, errors: signInErrors} = useAuth();

    const handleFormSubmit = (data) => {
        signin(data);
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/Inicio');
        }
    }, [isAuthenticated]);

    return (
        <div className={styles.container}>
            <ArrowBack dir='/' />
            
            <div className={styles.containerForm}>
                <h2 className={styles.pageTitle}> Iniciar sesión </h2>

                {signInErrors.map((error, i) => (
                    <div key={i} className={styles.errorMessage}>
                        {error}
                    </div>
                ))}

                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                    <label className={styles.label}>
                        Email
                        <input type='email' {...register('email', { required: 'Email requerido'})}/>

                        <p className={styles.errorMessage}> {errors.email?.message} </p>
                    </label>
                    
                    <label className={styles.label}>
                        Contraseña
                        <input type='password' {...register('password', { required: 'Contraseña requerida'})}/>

                        <p className={styles.errorMessage}> {errors.password?.message} </p> 
                    </label>
            
                    <button type="submit" className={styles.button}> Iniciar sesión </button>            
                </form>

                <Link to="../RecuperarCuenta" className={styles.forgotPassword}> ¿Olvidaste tu contraseña? </Link>
                <Link to="../Registro" className={styles.signUp}> ¿No tienes cuenta? Registrate ahora </Link>
            </div>
        </div>
    );
};

export default InicioSesion;