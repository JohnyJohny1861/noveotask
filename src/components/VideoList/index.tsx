import { FC, useState } from 'react';

import styles from './style.module.css';
import playIcon from '../../assets/playIcon.png';

import { ListGroup } from 'react-bootstrap';

import Alert from '../../UI/Alert';
import Loader from '../../UI/Loader';
import Modal from '../../UI/Modal';
import VideoPlayer from '../../UI/VideoPlayer';

import { Props } from './types';

const VideoList:FC<Props> = ({ videos, loading, alertMsg }) => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [videoModal, setVideoModal] = useState<boolean>(false);

    const onPlayVideo = (v:string) => {
        setVideoModal(true);
        setVideoUrl(v);
    }

    return (
        <>
            <Alert type="danger" alert={alertMsg} />
            <Modal modal={videoModal} setModal={setVideoModal}>
                <VideoPlayer src={videoUrl} />
            </Modal>
            { loading ? 
                <Loader /> : 
                <ListGroup className={styles.VideoList} as="ul">
                    {videos.map((v, i) => (
                        <ListGroup.Item 
                            key={i} 
                            onClick={() => onPlayVideo(v.url)} 
                            className={styles.listItem} 
                            as="li"
                        >
                            <img className={styles.playIcon} src={playIcon} alt="playIcon" />
                            <span className={styles.videName}>{v.name}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </>
    )
}

export default VideoList;