import styles from './Error404.module.css';
import { useRouteError } from 'react-router-dom';

const Error404 = () => {
    const error = useRouteError();

    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}> Página no encontrada </h2>
            {/* Detalles del error */}
            <p className={styles.text}> {error.data}  </p> 
        </div>
    );
};

export default Error404;