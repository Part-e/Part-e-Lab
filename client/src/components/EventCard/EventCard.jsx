import PropTypes from 'prop-types';
import { useTask } from '../../context/TasksContext';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import styles from './EventCard.module.css';

export function EventCard({ task }) {
    const { deleteTask } = useTask();
    const navigate = useNavigate();

    const handleInvitation = async (pin) => {
        try {
            await import(`../../Invitaciones/${pin}.jpg`);
            navigate(`/Invitacion/2/${pin}`);
        } catch (error) {
            toast.error('La invitación no está lista');
        }
    };

    const handleDetails = (id) => {
        navigate(`/Detalles/${id}`);
    }

    const handleEdit = (id) => {
        navigate(`/EditarInvitacion/${id}`);
    }

    const handleDelete = (id) => {
        deleteTask(id);
        toast.success('Invitación eliminada');
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.containerText}>
                <h2 className={styles.cardTitle}> {task.nameEvent} </h2>
                <p className={styles.pin}> PIN: {task.pin} </p>

            </div>
            
            <div className={styles.containerButtons}>
                <button onClick={() => handleInvitation(task.pin)} className={styles.invitationButton}> Invitación </button>
                <button onClick={() => handleDetails(task._id)} className={styles.detailsButton}> Detalles </button>
                <button onClick={() => handleEdit(task._id)} className={styles.editButton}> Editar </button>
                <button onClick={() => handleDelete(task._id)} className={styles.deleteButton}> Eliminar </button>
            </div>
        </div>
    );
}

EventCard.propTypes = {
    task: PropTypes.object.isRequired
};