import { Component, RefObject, createRef } from 'react';
import styles from './style.module.css';

import { Form, Button } from 'react-bootstrap';
import Alert from '../../UI/Alert';
import { Props, State } from './types';
import { uploadVideo } from './query';

class UploadVideo extends Component<Props, State> {
    timer: any;
    private fileInpRef: RefObject<HTMLInputElement>;

    constructor(props:Props) {
        super(props)
        this.fileInpRef = createRef();
    }

    state: State = {
        alertType: undefined,
        alertMsg: undefined
    };

    componentDidUpdate = () => {
        if(this.state.alertMsg) {
            this.timer = setTimeout(() => {
                this.setState({
                    alertType: undefined,
                    alertMsg: undefined
                })
            }, 3000);
        }
    }
    componentWillUnmount = () => { clearTimeout(this.timer) }

    onSubmit = async() => {
        let files = this.fileInpRef.current?.files;
        if(files && files[0]) {
           const { data, error } = await uploadVideo(files[0]);
            if(data) {
                this.setState({
                    alertMsg: 'Video uploaded successfully',
                    alertType: 'success'
                });
                this.props.onFileUploaded()
            } 
            else {
                this.setState({
                    alertMsg: error,
                    alertType: 'danger'
                })
            }
        }
    }

    render() {
        return (
            <>
                <Alert 
                    type={this.state.alertType} 
                    alert={this.state.alertMsg} 
                />
                <div className={styles.UploadVideo}>
                    <Form.Control
                        ref={this.fileInpRef}
                        type="file"
                    />
                    <Button 
                        variant="primary" 
                        type="submit"
                        onClick={this.onSubmit}
                        className="ms-3">Primary
                    </Button>
                </div>
            </>
        )
    }
}

export default UploadVideo;