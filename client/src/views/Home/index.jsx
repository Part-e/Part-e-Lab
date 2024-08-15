import NavBar from '../../components/NavBar';

import styles from './Home.module.css';

const Home = () => {
    return (
        <div>
            <NavBar/>

            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    <h1> Bienvenido a Part.e (Lab) </h1>
                </div>
                
                <p className={styles.text}> 
                    Part.e te ayuda a crear y compartir la invitación de tu evento. <br/> <br/>

                    En tu invitación puedes colocar toda la información que consideres necesaria para tus invitados <br/> ¿Necesitas cambiar algo? No te preocupes, puedes hacerlo. <br/> <br/>

                    Deja de compartir archivos pesados y difíciles de abrir, <br/> te ofrecemos una herramienta fácil de usar y accesible para todos. <br/> <br/>

                    Part.e es el lugar perfecto para crear la invitación de tu evento. <br/> <br/>
                </p>
            </div>
        </div>
    )
}

export default Home;