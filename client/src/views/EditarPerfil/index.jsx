import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import ArrowBack from '../../components/ArrowBack';
import toast from 'react-hot-toast';

import styles from './EditarPerfil.module.css';

const EditarPerfil = () => {
    const { handleSubmit, register, setValue, formState: {errors}} = useForm();
    const { user, getUser, updateProfile, errors: registerErrors } = useAuth();
    const params = useParams();
    const navigate = useNavigate();
    
    const handleFormSubmit = async(data) => {
        try {
            await updateProfile(params.id, data);
            toast.success('Perfil actualizado');
            setTimeout(() => {
                navigate(`/Inicio/MiPerfil/${user.id}`);
            }, 2000); 
        } catch (error) {
            toast.error('Usuario no actualizado');
        }
    };

    useEffect(() => {
        async function loadUser() {
            if(params.id){
                const user = await getUser(params.id);
                setValue('username', user.username);
                setValue('email', user.email);
                setValue('phoneNumber', user.phoneNumber);
            }
        }
        loadUser();
    }, []);

    return (
        <div>
            <ArrowBack dir={`/Inicio/MiPerfil/${user.id}`}/>

            <div className={styles.container}>
                <h2 className={styles.pageTitle}>Editar perfil</h2>

                {registerErrors.map((error, i) => (
                    <div key={i} className={styles.errorMessage}>
                        {error}

                    </div>
                ))}

                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                    <label className={styles.label}>
                        Nombre 
                        <input type="text" {...register('username', { required: 'Nombre requerido'})}/>
                        <p className={styles.errorMessage}> {errors.username?.message} </p>  
                    </label>
                    
                    <label className={styles.label}>
                        Correo
                        <input type="email" {...register('email', { required: 'Email requerido'})}/>
                        <p className={styles.errorMessage}> {errors.email?.message} </p>
                    </label>
                    
                    <label className={styles.label}>
                        Celular
                        <input type="tel" {...register('phoneNumber', { required: 'Número requerido', maxLength: {value: 10, message: 'Deben ser 10 digítos'}})}
                        
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            
                            if (e.target.value.length > 10) {
                              e.target.value = e.target.value.slice(0, 10);
                            }
                          }}
                        />

                        <p className={styles.errorMessage}> {errors.phoneNumber?.message} </p>
                    </label>
                    
                    <div className={styles.containerButtons}>
                        <button onClick={()=> navigate(`/Inicio/MiPerfil/${user.id}`)} type='button'> Cancelar </button>
                        <button type="submit"> Guardar cambios</button>
                    </div>

                    <div className={styles.politica}>
                        <a href="/AvisoPrivacidad" target="_blank" rel="noopener noreferrer"> Aviso de privacidad </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarPerfil;