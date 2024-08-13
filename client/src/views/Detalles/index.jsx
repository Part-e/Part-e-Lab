import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTask } from '../../context/TasksContext';
import { useParams } from 'react-router-dom';

import ArrowBack from "../../components/ArrowBack";

import styles from './Detalles.module.css';

const Detalles = () => {
    const { register, setValue} = useForm();
    const { getTask } = useTask();
    const params = useParams();
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        async function loadTask() {
            if(params.id){
                const task = await getTask(params.id);

                const startEventDate = new Date(task.startEvent);
                const endEventDate = new Date(task.startEvent); // Si esto debería ser task.endEvent, cámbialo acordemente
                setValue('pin', task.pin);
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
            
                <h2 className={styles.pageTitle}> Evento: {eventName} </h2>

                <p className={styles.text}> Toda la información proporcionada en el siguiente formulario aparecerá en tu invitación. <br/> En caso de querer hacer modificaciones después de enviarlo, debes ir a la página Lista de eventos. </p>

                <form className={styles.form}>
                    <label className={styles.label}>
                        PIN de la invitación
                        <input type='text' className={styles.pin} {...register('pin', { required: true})} readOnly/>
                    </label>

                    <label className={styles.label}>
                        Nombre del evento
                        <input type='text' className={styles.normalInput} {...register('nameEvent', { required: true})} readOnly/>
                    </label>

                    <label className={styles.label}>
                        Host del evento
                        <input type='text' className={styles.normalInput} {...register('host', { required: true})} readOnly/>
                    </label>

                    <label className={styles.label}>
                        Información (Descripción del evento)
                        <textarea {...register('info', { required: true, minLength: { value: 10}, maxLength: {value : 500}})} readOnly/>
                    </label>

                    <label className={styles.label}>
                        Inicio del evento (fecha y hora)
                        <input type='datetime-local' className={styles.smallInput} {...register('startEvent', { required: true })} readOnly/>
                    </label>

                    <label className={`${styles.label} ${styles.labelDate}`}>
                        <p className={styles.descriptiveText}> Si tu evento no tiene una fecha de término, ignora el siguiente campo. </p>

                        Fin del evento (fecha y hora)
                        <input type='datetime-local' className={styles.smallInput} {...register('endEvent')}/>
                    </label>

                    <label className={styles.label}>
                        Ubicación
                        <input type='text' className={styles.normalInput} {...register('location', { required: true})} readOnly/>
                    </label>

                    <label className={styles.label}>
                        Menú
                        <textarea type='text' className={styles.normalInput} {...register('menu', { maxLength: {value: 500} })} readOnly/>
                    </label>

                    <label className={styles.label}>
                        Información importante (reglas, recomendaciones, etc.)
                        <textarea type='text' {...register('importantInfo', { minLength: { value: 10}, maxLength: {value : 500}})} readOnly/>
                    </label> 
                </form>
            </div>
        </div>
    )
}

export default Detalles;