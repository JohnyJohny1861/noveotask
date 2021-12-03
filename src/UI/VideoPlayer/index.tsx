import { FC, useState, useRef, useCallback } from "react";
import styles from './style.module.css';
import playIcon from '../../assets/playIcon.png';
import pauseIcon from '../../assets/pauseIcon.png';

const VideoPlayer:FC<{src: string}> = ({src}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);

    const onPlay = useCallback(() => {
        if(videoRef.current) {
            const video = videoRef.current;
            play ? video.pause() : video.play();
            setPlay(!play);
        }
    }, [play])

    const onTimeUpdate = useCallback(() => {
        if(videoRef.current) {
            const video = videoRef.current;
            const duration = video.duration;
            const curTime = video.currentTime;
            setProgress((curTime / duration) * 100);
        }
    }, []);

    const onEnded = () => {
        if(videoRef.current) {
            videoRef.current.currentTime = 0;
            setPlay(false);
            setProgress(0);
        }
    }

    return (
        <div className={styles.VideoPlayer}>
            <video 
                ref={videoRef}
                className={styles.video} 
                src={src}
                onTimeUpdate={onTimeUpdate}
                onEnded={onEnded}
            >
            </video>
            <div className={styles.controls}>
                <img 
                    className={styles.playPause} 
                    src={play ? pauseIcon : playIcon} 
                    alt="icon" 
                    onClick={onPlay}
                />
                <span className={styles.range}>
                    <span className={styles.rangeEmpty}></span>
                    <span 
                        className={styles.rangeFill}
                        style={{width: progress + '%'}}
                    ></span>
                </span>
                <span className={styles.durations}>
                    <span className={styles.durLeft}>
                        {videoRef.current && getTimeFormat(videoRef.current.currentTime) + '/'}
                    </span>
                    <span className={styles.durTotal}>
                        {videoRef.current && getTimeFormat(videoRef.current.duration)}
                    </span>
                </span>
            </div>
        </div>
    )
}

const getTimeFormat = (secs:number) => {
    let h = Math.floor(secs / 3600);
    secs -= h * 3600;
    let m = Math.floor(secs / 60);
    secs -= m * 60;
    let s = Math.round(secs);
    let res = ''
    if(h > 0) { res += h <= 9 ? `0${h}:` : `${h}:` }
    if(m >= 0) { res += m <= 9 ? `0${m}:` : `${m}:` }
    if(s >= 0) { res += s <= 9 ? `0${s}` : `${s}` }
    return res;
}

export default VideoPlayer;