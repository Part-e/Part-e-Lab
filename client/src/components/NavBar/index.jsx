import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { memo, useState } from 'react';

import styles from './NavBar.module.css'

const NavBar = () => {
    const location = useLocation();
    const { pathname } = useLocation();
    const isInicio = location.pathname.includes('Inicio');
    const { logout, user } = useAuth(); 
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú desplegable
    
    const handleTabClick = (path) => {
        navigate(`/Inicio/${path}`);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const handleNotInicio = (path) => {
        navigate(`${path}`);
    }    

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alternar la visibilidad del menú
    }

    return (
        <nav className={styles.navbar}>
            <button className={styles.menuButton} onClick={toggleMenu}>MENÚ</button>
            <div className={`${styles.menuItems} ${menuOpen ? styles.show : ''}`}>
                {isInicio ? (
                    <>
                        <button 
                            onClick={() => handleTabClick('NuevaInvitacion')} 
                            className={`${pathname.includes('NuevaInvitacion') ? styles.active: ''}`} > 
                            Nueva invitación
                        </button>

                        <button 
                            onClick={() => handleTabClick('MisInvitaciones')} 
                            className={`${pathname.includes('MisInvitaciones') ? styles.active: ''}`} > 
                            Mis invitaciones
                        </button> 
                        
                        <button 
                            onClick={() => handleTabClick(`MiPerfil/${user.id}`)}
                            className={`${pathname.includes('MiPerfil') ? styles.active: ''}`}> 
                            Mi perfil 
                        </button>
                        
                        <button onClick={() => handleTabClick('Contacto/2')}>Contacto</button>
                        
                        <button onClick={handleLogout}> Cerrar sesión </button>
                    </>
                ):(
                    <>
                        <button onClick={() => handleNotInicio('/InicioSesion')}>Inicio de sesión</button>
                        <button onClick={() => handleNotInicio('/Registro')}>Registro</button>
                        <button onClick={() => handleNotInicio('/Invitado')}>Invitado</button>
                        {/* <button onClick={() => handleNotInicio('/')}>Demo</button> */}
                        <button onClick={() => handleNotInicio('/Contacto/1')}>Contacto</button>
                        <button onClick={() => handleNotInicio('/Nosotros')}>Nosotros</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default memo(NavBar);