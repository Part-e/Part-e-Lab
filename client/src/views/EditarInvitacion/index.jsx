import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useTask } from '../../context/TasksContext';

import { MapWithGeocoder } from '../../components/MapBox/MapBox';

import ArrowBack from '../../components/ArrowBack';
import toast from 'react-hot-toast';

import styles from './EditarInvitacion.module.css';

const EditarInvitacion = () => {
    const { handleSubmit, register, reset, setValue, watch, formState: {errors}} = useForm();
    const { getTask, updateTask } = useTask();
    const params = useParams();
    const navigate = useNavigate();
    const startEvent = watch('startEvent');
    const [eventName, setEventName] = useState('');

    function handleClean() {
        reset();
    }

    const handleFormSubmit = (data) => {
        toast.success('Evento editado');
        setTimeout(() => {
            updateTask(params.id, data);
            navigate("/Inicio/MisInvitaciones");
        }, 2000);
    };

    useEffect(() => {
        if (startEvent) {
          setValue('endEvent', startEvent, { shouldValidate: true });
        }
    }, [startEvent, setValue]);

    useEffect(() => {
        async function loadTask() {
            if(params.id){
                const task = await getTask(params.id);

                const startEventDate = new Date(task.startEvent);
                const endEventDate = new Date(task.startEvent); // Si esto debería ser task.endEvent, cámbialo acordemente
                setValue('nameEvent', task.nameEvent);
                setValue('host', task.host);
                setValue('info', task.info);
                setValue('startEvent', formatDateForInput(startEventDate));
                setValue('endEvent', formatDateForInput(endEventDate));
                setValue('location', task.location);
                setValue('menu', task.menu);
                setValue('importantInfo', task.importantInfo);

                setEventName(task.nameEvent); // Para mostrar el nombre del evento en el título de la página
            }
        }
        loadTask();
    }, []);

    const formatDateForInput = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() devuelve un índice basado en cero
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div>
            <ArrowBack dir='/Inicio/MisInvitaciones'/>

            <div className={styles.container}>
                <h2 className={styles.pageTitle}> Editando tu invitación: {eventName} </h2>

                <p className={styles.text}> Toda la nueva información proporcionada en el siguiente formulario aparecerá en tu invitación. <br/> Puedes volver a editarlo de ser necesario. <br/> <br/> * Campos obligatorios </p>

                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
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
                        <textarea type='text' className={styles.normalInput} {...register('menu', { maxLength: {value: 500} })} />
                    </label>

                    <label className={styles.label}>
                        Información importante (reglas, recomendaciones, etc.)
                        <textarea type='text' {...register('importantInfo', { minLength: { value: 10}, maxLength: {value : 500}})} />
                    </label>
                    
                    <label className={styles.label}>
                        <div className={styles.labelCheck}>
                            <input type="checkbox" {...register('check', { required: "Debes aceptar los términos y condiciones" })} /> 
                            <a href="/TerminosCondiciones"> Leí y acepto los términos y condiciones </a>
                        </div>
                        
                        <p className={styles.errorMessage}> {errors.check?.message} </p>
                    </label>
                    
                    <button onClick={handleClean} type='button' className={styles.cleanButton}> Limpiar campos </button>
                    <button onClick={() => navigate("/Inicio/MisInvitaciones")} type='button' className={styles.cancelButton}> Cancelar </button>
                    <button type="submit" className={styles.saveButton}> Guardar edición </button> 
                </form>
            </div>
        </div>
    )
}

export default EditarInvitacion;