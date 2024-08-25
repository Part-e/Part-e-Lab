import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTask } from '../../../../context/TasksContext';
import { useNavigate } from 'react-router-dom';

import { MapWithGeocoder } from '../../../../components/MapBox/MapBox';

import toast from 'react-hot-toast';

import styles from './NuevaInvitacion.module.css';

const NuevaInvitacion = () => {
    const { handleSubmit, register, reset, watch, setValue, formState: {errors}} = useForm();
    const { createTask, errors: taskErrors} = useTask();
    
    const startEvent = watch('startEvent');
    const navigate = useNavigate();
    let pin = 0
    
    function handleClean() {
        reset();
    }

    const handleFormSubmit = async (data) => {
        try {
            await createTask(data);
            toast.success('Evento creado');
            setTimeout(() => {
                navigate("/Inicio/MisInvitaciones");
            }, 2000);
        } catch (error) {
            toast.error('Error al crear el evento');
        }
    };

    const createPIN = () => {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomChars = '';
        for (let i = 0; i < 3; i++) {
            randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        pin = `${year}${day}${month}${randomChars}`;
        setValue('pin', pin);
    }

    useEffect(() => {
        if (startEvent) {
          setValue('endEvent', startEvent, { shouldValidate: true });
        }
    }, [startEvent, setValue]);

    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}> Crea tu invitación </h2>

            <p className={styles.text}> Toda la información proporcionada en el siguiente formulario aparecerá en tu invitación. <br/> En caso de querer hacer modificaciones después de enviarlo, debes ir a la página Mis invitaciones. <br/> <br/> * Campos obligatorios </p>

            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                <label className={styles.label}>
                    PIN de la invitación (No es modificable)*
                    <input type='text' className={styles.pin} {...register('pin', { required: "PIN del evento requerido"})} readOnly/>
                    <button type='button' onClick={createPIN} className={styles.pinButton}> Generar PIN </button>
                    <p className={styles.errorMessage}> {errors.pin?.message} </p>

                    {taskErrors.map((error, i) => (
                        <div key={i} className={styles.errorMessage}>
                            {error}
                        </div>
                    ))}
                </label>
                
                <label className={styles.label}>
                    Nombre del evento*
                    <input type='text' className={styles.normalInput} {...register('nameEvent', { required: "Nombre del evento requerido"})} />

                    <p className={styles.errorMessage}> {errors.nameEvent?.message} </p>
                </label>
                
                <label className={styles.label}>
                    Host del evento*
                    <input type='text' className={styles.normalInput} {...register('host', { required: "Nombre del host del evento requerido"})} />

                    <p className={styles.errorMessage}> {errors.host?.message} </p>
                </label>
                
                <label className={styles.label}>
                    Información (Descripción del evento)*
                    <textarea {...register('info', { required: "Descripción del evento requerida", maxLength: {value : 500}})} />

                    <p className={styles.errorMessage}> {errors.info?.message} </p>
                </label>
                
                <label className={styles.label}>
                    Inicio del evento (fecha y hora)*
                    <input type='datetime-local' className={styles.smallInput} {...register('startEvent', { required: "Horario de inicio del evento requerido" })}/>

                    <p className={styles.errorMessage}> {errors.startEvent?.message} </p>
                </label>
                
                <label className={`${styles.label} ${styles.labelDate}`}>
                    <p className={styles.descriptiveText}> Si tu evento no tiene una fecha de término, ignora el siguiente campo. </p>

                    Fin del evento (fecha y hora)
                    <input type='datetime-local' className={styles.smallInput} {...register('endEvent')}/>
                </label>

                <label className={`${styles.label} ${styles.labelLocation}`}>
                    <p className={styles.descriptiveText}> Busca la ubicación de tu evento en el mapa. <br/> Si no aparece, ingrésala directamente en el campo de abajo. </p>
                
                    Ubicación*
                    <input type='text' className={styles.normalInput} {...register('location', { required: "Ubicación requerida"})}/>

                    <p className={styles.errorMessage}> {errors.location?.message} </p>

                    <div className={styles.mapBoxContainer}>
                        <div className={styles.mapBox}>
                            <MapWithGeocoder onLocation={(value) => setValue('location', value, { shouldValidate: true })}/>
                        </div>
                    </div>  
                </label>
                
                <label className={styles.label}>
                    Menú
                    <textarea type='text' {...register('menu', { maxLength: {value : 500}})} />
                </label>

                <label className={styles.label}>
                    Información importante (reglas, recomendaciones, etc.)
                    <textarea type='text' {...register('importantInfo', { maxLength: {value : 500}})} />
                </label>
                   
                <label className={styles.label}>
                    <div className={styles.labelCheck}>
                        <input type="checkbox" {...register('check', { required: "Debes aceptar los términos y condiciones" })} /> 
                        <p> Leí y acepto los <a href="/TerminosCondiciones" target="_blank" rel="noopener noreferrer"> términos y condiciones </a> </p>
                    </div>
                    
                    <p className={styles.errorMessage}> {errors.check?.message} </p>
                </label>

                <button type='button' onClick={handleClean} className={styles.cleanButton}> Limpiar campos </button>
                <button type="submit" className={styles.createButton}> Crear evento </button> 
            </form>
        </div>
    )
}

export default NuevaInvitacion;