import { useState } from 'react';

import ArrowBack from '../../components/ArrowBack';
import toast from 'react-hot-toast';

import styles from './Invitado.module.css';
import { useNavigate } from 'react-router-dom';

const Invitado = () => {
    const [pin, setPin] = useState('');
    let navigate = useNavigate();
    
    const handleIngresar = async () => {
        try {
            await import(`../../Invitaciones/${pin}.jpg`);
            navigate(`/Invitacion/1/${pin}`);
        } catch (error) {
            if(pin.length === 0) {
                toast.error('Ingresa un PIN');
            }else{ 
                toast.error('Invitación no encontrada');
            }
        }
    };    

    return (
        <div>
            <ArrowBack dir='/' />

            <div className={styles.container}>

                <h2 className={styles.pageTitle}> Invitado </h2>

                <label className={styles.label}>
                    Ingresa el PIN de la invitación

                    <input onChange={(e) => setPin(e.target.value)} className={styles.pin}/>
                </label>


                <button onClick={handleIngresar} className={styles.button}>Ingresar</button>
            </div>
        </div>
    );
}

export default Invitado