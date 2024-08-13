import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from "react-router-dom";

import ArrowBack from '../../components/ArrowBack';
import toast from 'react-hot-toast';

import styles from './EliminarCuenta.module.css';

const EliminarCuenta = () => {
    const { user, deleteAccount, errors: errorsDelete } = useAuth();
    const { handleSubmit, register, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    
    const handleFormSubmit = async () => {
        try {
            await deleteAccount(params.id);
            toast.success('Cuenta eliminada');
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            toast.error('Error al eliminar la cuenta');
        }
    }

    return (
        <div>
            <ArrowBack dir={`/Inicio/MiPerfil/${user.id}`} />

            <div className={styles.container}>
                <h2 className={styles.pageTitle}>Elimina tu cuenta</h2>

                <p className={styles.text}> Hola {user.username} ¿Estás segura que quieres eliminar tu cuenta? </p>

                {errorsDelete.map((error, i) => (
                    <div key={i} className={styles.errorMessage}>
                        {error}
                    </div>
                ))}

                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                    <label className={styles.label}>
                        <div className={styles.labelCheck}>
                            <input type="checkbox" {...register('check', { required: "Debes aceptar los términos y condiciones" })} onChange={handleCheckboxChange}/> 
                            Si, quiero eliminar mi cuenta
                        </div>
                        
                        {/* <p className={styles.errorMessage}> {errors.check?.message} </p> */}                     
                    </label>

                    <button type="submit" className={styles.button} disabled={!isChecked}> Eliminar cuenta </button>   
                </form>
            </div>
        </div>
    );
}

export default EliminarCuenta;