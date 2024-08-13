import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import ArrowBack from '../../components/ArrowBack';
import toast from 'react-hot-toast';

import styles from './CambiarContrasena.module.css';

const CambiarContrasena = () => {
    const { handleSubmit, register, watch, formState: {errors}} = useForm();
    const { user, updatePassword, errors: registerErrors } = useAuth();
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const params = useParams();
    const navigate = useNavigate();

    const handleFormSubmit = async(data) => {
        try {
            await updatePassword(params.id, data);
            toast.success('Contraseña actualizada');
            setTimeout(() => {
               navigate(`/Inicio/MiPerfil/${user.id}`);
            }, 2000);
        } catch (error) {
            toast.error('Contraseña no actualizada');
        }
    };    

    useEffect(() => {
        if (password && confirmPassword && password.length >= 8 && confirmPassword.length >= 8) {
            setPasswordsMatch(password === confirmPassword);
        } else {
            setPasswordsMatch(false);
        }
    }, [password, confirmPassword]);

    return (
        <div>
            <ArrowBack dir={`/Inicio/MiPerfil/${user.id}`}/>

            <div className={styles.container}>
                <h2 className={styles.pageTitle}>Cambiar contraseña</h2>

                {registerErrors.map((error, i) => (
                    <div key={i} className={styles.errorMessage}>
                        {error}
                    </div>
                ))}

                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                    <label className={styles.label}>
                        Contraseña actual
                        <input type="password" {...register('oldPass', { required: 'Contraseña actual requerida'})}/>
                    </label>
                    <p className={styles.errorMessage}> {errors.oldPass?.message} </p>

                    <label className={styles.label}>
                        Nueva contraseña
                        <input type="password" {...register('password', { required: 'Nueva contraseña requerida', minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }})}/>
                    </label>
                    <p className={styles.errorMessage}> {errors.password?.message} </p>

                    <label className={styles.label}>
                        Confirmar contraseña
                        <input type="password" {...register('confirmPassword', { required: 'Confirma la contraseña', minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }})}/>
                    </label>
                    <p className={styles.errorMessage}> {errors.confirmPassword?.message} </p>

                    {passwordsMatch && <p className={styles.passMatch}>Las contraseñas coinciden</p>}

                    <div className={styles.containerButtons}>
                        <button onClick={()=> navigate(`/Inicio/MiPerfil/${user.id}`)} type='button'> Cancelar </button>
                        <button type="submit"> Cambiar contraseña </button>             
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CambiarContrasena;