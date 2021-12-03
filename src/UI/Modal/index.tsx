import { FC } from 'react';

import { Modal, Button } from 'react-bootstrap';

import { Props } from './types';

const CustomModal:FC<Props> = ({ children, modal, setModal }) => {
    return (
        <Modal size="lg" show={modal} onHide={() => setModal(false)}>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal;