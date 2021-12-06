import { FC, useState } from 'react';

import styles from './style.module.css';
import playIcon from '../../assets/playIcon.png';

import { ListGroup } from 'react-bootstrap';

import Loader from '../../UI/Loader';
import Modal from '../../UI/Modal';
import VideoPlayer from '../../UI/VideoPlayer';

import { Props } from './types';

const VideoList:FC<Props> = ({ videos, loading }) => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [videoModal, setVideoModal] = useState<boolean>(false);

    const onPlayVideo = (v:string) => {
        setVideoModal(true);
        setVideoUrl(v);
    }

    return (
        <>
            <Modal modal={videoModal} setModal={setVideoModal}>
                <VideoPlayer src={videoUrl} />
            </Modal>
            { loading ? 
                <Loader /> : 
                <ListGroup className={styles.VideoList} as="ul">
                    {videos.map(vid => (
                        <ListGroup.Item 
                            key={vid.id} 
                            onClick={() => onPlayVideo(vid.url)} 
                            className={styles.listItem} 
                            as="li"
                        >
                            <img className={styles.playIcon} src={playIcon} alt="playIcon" />
                            <span className={styles.videName}>{vid.name}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </>
    )
}

export default VideoList;