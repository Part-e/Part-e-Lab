import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/AuthContext';

import styles from './MiPerfil.module.css';

const Perfil = () => {
    const { getUser } = useAuth(); // Obtiene el usuario del contexto
    const { register, setValue} = useForm();
    const params = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            const user = await getUser(params.id);
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('phoneNumber', user.phoneNumber);
            setValue('password', user.password);
        }
        loadUser();
    }, []);

    const handleEdit = (id) => {
        navigate(`/EditarPerfil/${id}`);
    }

    const handleChangePass = () => {
        navigate(`/CambiarContrasena/${user.id}`);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>Mi perfil</h2>
            
            <div>
                <form className={styles.form}>
                    <label className={styles.label}>
                        Nombre de usuario
                        <input type="text" {...register('username')} readOnly/>
                    </label>
                    <label className={styles.label}>
                        Correo
                        <input type="email" {...register('email')} readOnly/>
                    </label>
                    <label className={styles.label}>
                        Teléfono  
                        <input type="text" {...register('phoneNumber')} readOnly/>
                    </label>
                </form>

            </div>
            
            <div className={styles.containerButtons}>
                <button onClick={() => handleEdit(user.id)} type='button'> Actualizar mis datos </button>
                <button onClick={() => handleChangePass()} type='button'> Cambiar contraseña </button>
                <button onClick={() => navigate(`/EliminarCuenta/${user.id}`)} type='button'> Eliminar cuenta </button>
            </div>

            <div className={styles.politica}>
                <a href="/AvisoPrivacidad" > Aviso de privacidad </a>
            </div>

        </div>
    );
}

export default Perfil;