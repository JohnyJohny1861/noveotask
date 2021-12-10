import { FC } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import styles from './style.module.css';
import { Props } from './types';

const alertDom = document.getElementById('dom-alert') as HTMLElement;

const Alert:FC<Props> = function ({ msg, type }) {
    return (
        msg ? createPortal(
          <BootstrapAlert className={styles.Alert} variant={type}>
            {msg}
          </BootstrapAlert>,
            alertDom,
        ) : null
    );
};
export default Alert;
