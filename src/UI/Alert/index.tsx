import { FC  } from 'react';
import styles from './style.module.css';
import { Props } from './types';
import { Alert } from 'react-bootstrap';
import { createPortal } from "react-dom";

const alertDom = document.getElementById("dom-alert") as HTMLElement;

const index:FC<Props> = ({ type, alert }) => {  
    return (
        alert ? createPortal(
            <Alert className={styles.CustomAlert} variant={type}>
                {alert}
            </Alert>, 
            alertDom
        ) : null
    )
}
export default index