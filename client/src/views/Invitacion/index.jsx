import { useParams } from 'react-router-dom';
import { MdDownload, MdShare } from 'react-icons/md';

import toast from 'react-hot-toast';
import ArrowBack from '../../components/ArrowBack';

import styles from './Invitacion.module.css';

const Invitacion = () => {
    const { n, pin } = useParams();
    const imageSrc = `/src/Invitaciones/${pin}.jpg`;
    const backDir = n === '1' ? '/Invitado' : '/Inicio/MisInvitaciones';

    function handleDownload(){
        try {
            // Crear un elemento <a> temporal
            const link = document.createElement('a');
            // Establecer el atributo href con la URL de la imagen
            link.href = imageSrc;
            // Opcional: Establecer el atributo download para especificar el nombre del archivo
            link.download = `Invitacion-${pin}.jpg`;
            // Agregar el elemento <a> al documento (esto es necesario para que el clic funcione en Firefox)
            document.body.appendChild(link);
            // Simular un clic en el enlace para iniciar la descarga
            link.click();
            // Eliminar el elemento <a> del documento
            document.body.removeChild(link);

            toast.success('Descarga iniciada');
        } catch (error) {
            toast.error('Error al iniciar la descarga');
        }  
    }

    function copyInvitationToClipboard() {
        const textToCopy = `Estás invitado a un evento. Entra al siguiente link e ingresa el código ${pin}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => toast.success('Texto copiado al portapapeles'))
            .catch(() => toast.error('Error al copiar el texto al portapapeles'));
    }

    return (
        <div>
            <ArrowBack dir={backDir} />

            <div className={styles.container}>
                <div className={styles.containerButton}>
                    <button onClick={handleDownload}> <MdDownload/> </button>
                    <button onClick={copyInvitationToClipboard}> <MdShare/> </button>
                </div>

                <img src={imageSrc} alt={`Invitación para el PIN ${pin}`} className={styles.image}/>
            </div>
        </div>
    );
}

export default Invitacion;