import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import NavBar from '../../components/NavBar';

import styles from "./Inicio.module.css";

const Inicio = () => {
    const { user } = useAuth();
    const isHome = useLocation().pathname === '/Inicio';

    return (
        <div>
            <NavBar/>

            {isHome && (
                <div className={styles.container}>
                    <h2 className={styles.pageTitle}>
                        Hola {user.username} <br/>
                        Bienvenide a Part.e
                    </h2>
                </div>
            )}

            <Outlet/>
        </div>
    )
}

export default Inicio;