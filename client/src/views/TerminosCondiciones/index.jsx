import ArrowBack from '../../components/ArrowBack';

import styles from './TerminosCondiciones.module.css';

const TerminosCondiciones = () => {
    return (
        <div className={styles.container}>
            <ArrowBack dir='/Inicio/MisInvitaciones'/>

            <h2 className={styles.pageTitle}>Terminos y condiciones</h2>

            <div className={styles.section}>
                <h3 className={styles.sectionName}>Sección 1: Creando una invitación </h3>
                <div className={styles.sectionText}>
                    <p>
                        <ol className={styles.alfabetica}>
                            <li>
                                Al crear una invitación en la página <a href="/Inicio/NuevaInvitacion"> Nueva invitación</a>, se recopilará la siguiente información:
                                <ol>
                                    <li>Nombre del evento</li>
                                    <li>Nombre del anfitrión (host)</li>
                                    <li>Descripción del evento</li>
                                    <li>Fecha y hora del evento (inicio y final)</li>
                                    <li>Lugar del evento</li>
                                    <li>Menú</li>
                                    <li>Información importante del evento (reglas, consideraciones, etc.)</li>
                                </ol>
                                De los puntos anteriores, la información obligatoria son los puntos 1, 2, 3, 4 (únicamente la fecha y hora de inicio) y 5. Esta información es necesaria para la elaboración de la invitación. Cualquier otra información es opcional y queda a criterio del usuario si es necesaria o no para su invitación.
                            </li>
                            <li>
                                Cualquier información que el usuario considere importante y no haya podido ser recopilada por la plataforma, puede ser agregada. Esto se explicará en la sección 2 punto C.
                            </li>
                            <li>
                                La invitación cuenta con un PIN que aparece al principio del formulario en la página <a href="/Inicio/NuevaInvitacion"> Nueva invitación</a>. Dicho PIN es necesario para que los invitados puedan acceder a la invitación, por lo que es responsabilidad del usuario compartir el PIN con los invitados.
                            </li>
                            <li>
                                El acceso a la invitación por parte de los invitados solo podrá llevarse a cabo una vez que la invitación haya sido entregada al usuario y esta se encuentre disponible en la plataforma. Los invitados podrán acceder a la invitación en la página <a href="/Invitado">Invitado</a>.
                            </li>
                            <li>
                                Los invitados no necesitarán de una cuenta en esta plataforma para acceder a cualquier invitación que se les haya compartido, solo necesitarán el PIN correspondiente.
                            </li>
                            <li>
                                Part.e no se hace responsable de la información que el usuario decida compartir en la creación de su invitación, por lo que se recomienda no compartir información sensible en la creación de un evento.
                            </li>
                            <li>
                                Part.e se reserva el derecho de negar el servicio a cualquier usuario cuya invitación contenga información ofensiva, discriminatoria o que atente contra la salud e integridad de las personas.
                            </li>
                        </ol>
                    </p>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionName}> Sección 2: Reunión con Part.e </h3>
                <div className={styles.sectionText}>
                    <p>
                        <ol className={styles.alfabetica}>
                            <li>
                                Después de que el usuario haya respondido y enviado el formulario que se encuentra en la página <a href="/Inicio/NuevaInvitacion"> Nueva invitación</a> un miembro del equipo de Part.e (que se identificará ante el usuario) se pondrá en contacto con el usuario (por medio del correo electrónico o número telefónico del usuario proporcionados por el mismo al momento de registrarse en la plataforma) para acordar una fecha y hora en la que se puedan reunir por medio de una videollamada. Si el usuario considera que la videollamada no es necesaria, puede solicitar que toda la comunicación se realice por medio del correo electrónico o chat de Whatsapp. 
                            </li>
                            <li>
                                La reunión mencionada en el punto anterior (sea o no sea llevada a cabo en una videollamada) será para acordar algunos detalles de la invitación, como el diseño, la fecha de entrega, el precio total de la invitación, el tiempo que la invitación dejará de estar disponible en la plataforma, los datos bancarios para realizar el pago y cualquier otro detalle que el miembro de Part.e o el usuario consideren necesarios aclarar.
                            </li>
                            <li>
                                Con respecto al punto B de la sección 1, cualquier información que el usuario considere importante para su invitación y no haya sido recopilada en el formulario de la página <a href="/Inicio/NuevaInvitacion"> Nueva invitación</a> puede ser agregada siempre y cuando el usuario lo mencione en la reunión mencionada en el punto anterior.
                            </li>
                            <li>
                                Con respecto al diseño, el usuario podrá elegir entre los diseños que Part.e tiene disponibles en la plataforma o podrá solicitar un diseño personalizado. En caso de solicitar un diseño personalizado, el usuario deberá proporcionar los detalles necesarios para la creación del diseño (colores, formas, imágenes, etc.).
                            </li>
                            <li>
                                Si el diseño de la invitación es personalizado, el miembro de Part.e se encargará de realizar el diseño y se lo mostrará al usuario para que este pueda aprobarlo o solicitar cambios. Esto no tiene costo adicional.
                            </li>
                            <li>
                                Todos los detalles mencionados en el punto B y C de esta sección serán firmados por ambas partes en un contrato en donde se especifique la información acordada.
                            </li>
                            <li>
                                En la fecha de entrega de la invitación, ambas partes deberán reunirse (por medio de una videollamada) para hacer la entrega visual de la invitación.
                            </li>
                            <li>
                                En ningun momento (durante o antes de la reunión) se le pedirán al usuario datos bancarios o información sensible, si el usuario recibe una solicitud de este tipo, deberá reportarlo a Part.e al correo part.emxteam@gmail.com
                            </li>
                        </ol>
                    </p>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionName}> Sección 3: Pago del servicio </h3>
                <div className={styles.sectionText}>
                    <p>
                        <ol className={styles.alfabetica}>
                            <li>
                                El precio total de la invitación será mencionado por el miembro de Part.e que se ponga en contacto con el usuario, el precio total de la invitación dependerá de la complejidad de la invitación.
                            </li>
                            
                            <li>
                                El pago se realizará por medio de transferencia bancaria. El usuario recibirá los datos bancarios (de Part.e) necesarios para realizar la transferencia en la reunión mencionada en el punto B de la sección 2.
                            </li>
                            
                            <li>
                                La elaboración de la invitación requiere un adelanto del 50% del costo total de la invitación. Mientras no se haya realizado dicho pago, la invitación no será trabajada por el equipo de Part.e. 
                            </li>

                            <li>
                                El 50% restante se debe de pagar entre las 24 horas antes de la fecha de entrega acordada en la reunión mencionada en el punto B de la sección 2.
                            </li>

                            <li>
                                Si el usuario decide cancelar el servicio antes de pagar el 50% de adelanto, al usuario no se le cobrará nada.
                            </li>

                            <li>
                                En caso de que el usuario decida cancelar la creación de la invitación después de haber realizado el pago del adelanto, el usuario no recibirá un reembolso del adelanto y el 50% restante no se cobrará al usuario.
                            </li>

                            <li>
                                Si el usuario decide cancelar la creación de su invitación un día (24 horas) antes de la fecha de entrega acordada, el usuario no recibirá un reembolso del adelanto y solo se le cobrará el 30% restante del costo total de la invitación.
                            </li>
                        </ol>
                    </p>
                </div>
            </div>
            
            <div className={styles.section}>
                <h3 className={styles.sectionName}> Sección 4: Entrega de la invitacion</h3>
                <div className={styles.sectionText}>
                    <p>
                        <ol className={styles.alfabetica}>
                            <li> 
                                Como se mencionó en el punto G de la sección 2, la entrega de la invitación se realizará por medio de una videollamada en la fecha y hora acordada por el usuario y el miembro de Part.e.
                            </li>

                            <li>
                                Se le mostrará al usuario la invitación en su totalidad (diseño y datos proporcionados por el usuario).
                            </li>

                            <li>
                                Si el diseño de la invitación no es del agrado del usuario, este puede ser cambiado considerando que esto llevara tiempo y se acordará con el usuario una nueva fecha de entrega. De igual manera se le cobrará otro 50% del costo total de la invitación.
                            </li>

                            <li>
                                Si el usuario aprueba la invitación debe de realizar el pago del 50% restante. Una vez que el pago se vea reflejado, la invitación estará disponible en la plataforma y se le notificará al usuario que la invitación se encuentra disponible en la plataforma.
                            </li>

                            <li>
                                Si el usuario quiere que se realicen cambios en la invitación después de la entrega, se le cobrará 10% del costo total de la invitación si los cambios son en cuanto a datos o 20% si los cambios son en cuanto al diseño.
                            </li>

                            <li>
                                La invitación estará disponible el tiempo acordado en la reunión mencionada en el punto B de la sección 2. Una vez que la invitación deje de estar disponible, el usuario no podrá acceder a la invitación y los invitados tampoco podrán acceder a la invitación.
                            </li>

                            <li>
                                Si el usuario desea que la invitación se encuentre más tiempo disponible en la plataforma solo se le cobrará el 10% del costo total de la invitación por el tiempo extra que el usuario desee.
                            </li>

                            <li>
                                El usuario y el miembro de Part.e firmarán el contrato mencionado en el punto E de la sección 2, en el que se especifique que la invitación ha sido entregada y que el usuario está de acuerdo con la invitación.
                            </li>
                        </ol>
                    </p>
                </div>
            </div>    

            <div className={styles.section}>
                <h3 className={styles.sectionName}> Sección 5: Compromisos extra de Part.e </h3>
                <div className={styles.sectionText}>
                    <p>
                        <ol className={styles.alfabetica}>
                            <li>
                                Part.e se compromete a entregar la invitación en la fecha y hora acordada con el usuario. Si por alguna razón la invitación no se puede entregar en la fecha y hora acordada, se le notificará al usuario y se acordará una nueva fecha de entrega. Se le descontará un 10% del costo total de la invitación al usuario por el retraso.
                            </li>

                            <li>
                                Part.e se compromete a no compartir la información proporcionada por el usuario con terceros, la información proporcionada por el usuario será utilizada únicamente para la creación de la invitación y para contactar al usuario en caso de ser necesario.
                            </li>

                            <li>
                                Part.e se compromete a tratar con respeto al usuario y a no realizar comentarios ofensivos o discriminatorios hacia el usuario. Si el usuario siente que está siendo tratado de manera ofensiva o discriminatoria, puede reportar al miembro de Part.e al correo part.emxteam@gmail.com y se le asignará otro miembro del equipo de Part.e para continuar con la creación de la invitación.
                            </li>

                            <li>
                                Cualquier cambio en los términos y condiciones de esta página será notificado al usuario por medio del correo electrónico proporcionado por el usuario al momento de registrarse en la plataforma, así como en la página <a href="/Inicio"> Inicio </a>.
                            </li>
                        </ol>
                    </p>
                </div>
            </div>
                
            <div className={styles.section}>
                <h3 className={styles.sectionName}> Sección 6: Compromisos extra del usuario </h3>
                <div className={styles.sectionText}>
                    <p>
                        <ol className={styles.alfabetica}>
                            <li>
                                El usuario no realizará comentarios ofensivos o discriminatorios hacia los miembros de Part.e, si el usuario realiza comentarios ofensivos o discriminatorios, se le negará el servicio.
                            </li>
                            
                            <li>
                                El usuario no compartirá la información proporcionada por Part.e o cualquiera de los miembros del equipo de Part.e, la información proporcionada por Part.e y sus miembros es confidencial y no debe ser compartida con nadie. Cualquier información compartida con terceros por el usuario será responsabilidad del usuario y Part.e se toma el derecho de negar el servicio al usuario asi como de tomar acciones legales en contra del usuario.
                            </li>
                            
                            <li>
                                El usuario se compromete a seguir al pie de la letra los términos y condiciones mencionados en esta página, si el usuario no sigue los términos y condiciones, se le negará el servicio.
                            </li>
                        </ol>
                    </p>
                </div>
            </div> 
        </div>
    );
}

export default TerminosCondiciones;