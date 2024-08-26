import { useEffect } from "react";
import { useTask } from "../../../../context/TasksContext";
import { EventCard } from "../../../../components/EventCard/EventCard";
import styles from './MisInvitaciones.module.css';

const MisInvitaciones = () => {
    const { getTasks, tasks } = useTask();

    useEffect(() => {
        getTasks();
    }, [])

    if(tasks.length === 0) return (<h2> No has creado ningún evento </h2>);

    return (    
        <div className={styles.container}>
            <h2 className={styles.pageTitle}> Mis invitaciones </h2>

            <div className={styles.terminos}>
                <a href="/TerminosCondiciones" target="_blank" rel="noopener noreferrer"> Términos y condiciones de las invitaciones </a>
            </div>
            
            <div className={styles.eventCard}>
                {tasks.map((task) => (<EventCard task={task} key={task._id}/>))}
            </div>
        </div>
    )
}

export default MisInvitaciones;