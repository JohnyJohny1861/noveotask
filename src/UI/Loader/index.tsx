import { Spinner } from "react-bootstrap"

const Loader = () => {
    return (
        <div className="d-flex justify-content-center p-3">
            <Spinner animation="border" role="status"></Spinner>
        </div>
    )
}

export default Loader;