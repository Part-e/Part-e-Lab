import { useParams } from 'react-router-dom';

import ArrowBack from "../../components/ArrowBack";
import toast from 'react-hot-toast';

import styles from "./Contacto.module.css";

const Contacto = () => {
    const { id } = useParams(); 
    const backDir = id === '1' ? '/' : id === '2' ? '/Inicio' : '/';
    const containerClass = id === '2' ? `${styles.container} ${styles.specialStyle}` : styles.container;
    
    const wa = '/whatsapp.svg';
    const ig = '/instagram.svg';
    const fb = '/facebook.svg';
    const email = '/email.svg';

    const handleCopy = () => {
        const email = 'part.emxteam@gmail.com';
        navigator.clipboard.writeText(email)
            .then(() => toast.success('Correo copiado'))
            .catch(() => toast.error('Error al copiar'));
    };

    return (
        <div className={containerClass}>
            { id !== '2' && <ArrowBack dir={backDir}/> }

            <h2 className={styles.pageTitle}> Contacto </h2>

            <p className={styles.text}> Si tienes alguna pregunta sobre el servicio puedes contactarnos por nuestras redes sociales:
            </p>         

            <div className={styles.socialMedia}>
                <button onClick={handleCopy}> <img src={email} alt={'Email'}/> part.emxteam@gmail.com </button>
                <button> <img src={wa} alt={'Whatsapp'}/> Part.e MX </button>
                <a href="https://www.instagram.com/part.emx/?next=%2F" target="_blank" rel="noopener noreferrer"> 
                    <button> <img src={ig} alt={'Instagram'} /> Part.eMX </button> 
                </a>
                
                <a href='https://www.facebook.com/profile.php?id=61563349136248' target='_blank' rel='noopener noreferrer'> 
                    <button> <img src={fb} alt={'Facebook'}/> Part.e MX </button> 
                </a>
            </div>

            <p className={styles.text}> Si ya solicitaste nuestros servicios y tienes alguna duda, comunicate directamente a nuestro WA. </p>            

            <div className={styles.horario}>
                <h3 className={styles.horario}> Horario de atención </h3>
                <ul>
                    <li> Lunes - Viernes: 9 am a 5 pm</li>    
                    <li> Sábados: 9 am a 1 pm</li>
                </ul>
            </div>
        </div>
    );
}

export default Contacto;