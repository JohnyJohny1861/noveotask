import { FC, ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';

const Loader:FC = function ():ReactElement {
    return (
      <div className="d-flex justify-content-center p-3">
        <Spinner animation="border" role="status" />
      </div>
    );
};

export default Loader;
