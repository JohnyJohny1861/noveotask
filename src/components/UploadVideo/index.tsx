import { Component, RefObject, createRef } from 'react';
import styles from './style.module.css';

import { Form, Button } from 'react-bootstrap';
import { Props, State } from './types';
import { uploadVideo } from './query';

class UploadVideo extends Component<Props, State> {
    timer: any;
    private fileInpRef: RefObject<HTMLInputElement>;

    constructor(props:Props) {
        super(props)
        this.fileInpRef = createRef();
    }

    componentWillUnmount = () => { clearTimeout(this.timer) }

    onSubmit = async() => {
        let files = this.fileInpRef.current?.files;
        if(files && files[0]) {
            this.props.setLoading(true);
            const { data, error } = await uploadVideo(files[0]);
            if(data) {
                this.props.setAlert({
                    msg: 'Video uploaded successfully',
                    type: 'success'
                });
                if(this.fileInpRef.current) {
                    this.fileInpRef.current.value = '';
                }
                this.props.onFileUploaded();
            } 
            else if(error) {
                this.props.setAlert({
                    msg: error,
                    type: 'danger'
                })
            }
            this.props.setLoading(false);
        }
    }

    render() {
        return (
            <>
                <div className={styles.UploadVideo}>
                    <Form.Control
                        ref={this.fileInpRef}
                        type="file"
                    />
                    <Button 
                        variant="primary" 
                        type="submit"
                        onClick={this.onSubmit}
                        className="ms-3">Upload
                    </Button>
                </div>
            </>
        )
    }
}

export default UploadVideo;