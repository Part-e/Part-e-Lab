import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

import { MdArrowBack } from 'react-icons/md';

import styles from './ArrowBack.module.css';

const ArrowBack = ({ dir }) => {
    const navigate = useNavigate(); 
    
    function HandleBack() {
        navigate(dir);
    }

    return (
        <div className={styles.arrowBackIcon}>
            <button onClick={HandleBack} className={styles.backButton}>
                <MdArrowBack />
            </button>
        </div>
    );
}

export default memo(ArrowBack);