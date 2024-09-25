import ArrowBack from '../../components/ArrowBack';

import styles from './AvisoPrivacidad.module.css';

const AvisoPrivacidad = () => {
    return (
        <div className={styles.container}>
            <ArrowBack dir='/Registro'/>

            <h2 className={styles.pageTitle}>Aviso de privacidad</h2>

            <p>
                <ol>
                    <li> 
                        Part.e es una plataforma que se dedica a la creación y distribución de invitaciones digitales. Para crear una cuenta en la plataforma es necesario que recopilemos cierta información personal de nuestros usuarios. La información que recopilamos incluye:
                        <ul className={styles.listaDatos}>
                            <li>Nombre</li>
                            <li>Correo electrónico</li>
                            <li>Número de teléfono</li>
                        </ul>
                    </li>

                    <li>
                        La información mencionada en el punto anterior es necesaria para crear una cuenta en nuestra plataforma, crear invitaciones, y permitirnos contactar a los usuarios cuando sea necesario. 
                    </li>

                    <li>
                        Para la creación de cualquier cuenta nunca se pedirá información sensible como el domicilio del usuario, datos bancarios, o información de tarjetas de crédito/débito.
                    </li>

                    <li>
                        La información recopilada no será compartida con terceros y será utilizada únicamente para los fines mencionados en el punto 2 del Aviso de privacidad.
                    </li>

                    <li>
                        El usuario puede eliminar en cualquier momento su cuenta de nuestra plataforma. Para proceder, deberá iniciar sesión en la plataforma, acceder a la sección &quot;Mi perfil&quot; y seleccionar la opción &quot;Eliminar cuenta&quot;. A continuación, el usuario deberá confirmar su decisión marcando la casilla correspondiente y presionando el botón &quot;Eliminar cuenta&quot;. Una vez completado este proceso, todos los datos asociados a la cuenta serán permanentemente eliminados del sistema.
                    </li>

                    <li>
                        Cualquier cambio en el Aviso de privacidad será notificado a los usuarios a través de la plataforma, en la página <a href="/Inicio" target="_blank" rel="noopener noreferrer"> Inicio </a>, y/o por correo electrónico.
                    </li>
                </ol>
            </p>
        </div>
    );
}

export default AvisoPrivacidad;