import ArrowBack from "../../components/ArrowBack";

import styles from "./Nosotros.module.css";

const Nosotros = () => {
    return (
        <div className={styles.container}>
            <ArrowBack dir='/'/>

            <h2 className={styles.pageTitle}> Nosotros </h2>
            <p className={styles.text}> 
                Part.e nace por Tania y Héctor, egresados de la Facultad de Ingeniería de la UNAM, quienes tuvieron la idea de cambiar el modo en el que se hacen y comparten las invitaciones para eventos como cumpleaños, graduaciones, bodas, entre otros. pasando de tarjetas físicas a dígitales 

                <br /> <br />

                En Part.e somos fieles creyentes de que la tecnología puede hacer la vida más fácil y brindar una experiencia agradable a los usuarios. Por ello, nos esforzamos por ofrecer un servicio de calidad y con un diseño atractivo para que puedas compartir las invitaciones de tus eventos de manera rápida y sencilla.
            </p>
        </div>
    );
}

export default Nosotros;