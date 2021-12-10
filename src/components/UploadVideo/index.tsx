/* eslint-disable react/destructuring-assignment, object-curly-newline */
import { Component, RefObject, createRef, ReactElement } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './style.module.css';

import { Props, State } from './types';
import { uploadVideo } from './query';

class UploadVideo extends Component<Props, State> {
    timer: any;

    private fileInpRef: RefObject<HTMLInputElement>;

    constructor(props:Props) {
        super(props);
        this.fileInpRef = createRef();
    }

    componentWillUnmount?():void { clearTimeout(this.timer); }

    onSubmit = async () => {
        const files = this.fileInpRef.current?.files;
        if (files && files[0]) {
            this.props.setLoading(true);
            const { data, error } = await uploadVideo(files[0]);
            if (data) {
                this.props.setAlert({
                    msg: 'Video uploaded successfully',
                    type: 'success',
                });
                if (this.fileInpRef.current) {
                    this.fileInpRef.current.value = '';
                }
                this.props.onFileUploaded();
            } else if (error) {
                this.props.setAlert({
                    msg: error,
                    type: 'danger',
                });
            }
            this.props.setLoading(false);
        }
    };

    render():ReactElement {
        return (
          <div className={styles.UploadVideo}>
            <Form.Control
              ref={this.fileInpRef}
              type="file"
            />
            <Button
              variant="primary"
              type="submit"
              onClick={this.onSubmit}
              className="ms-3"
            >
              Upload
            </Button>
          </div>
        );
    }
}

export default UploadVideo;
