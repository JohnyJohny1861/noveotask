/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useState, useRef } from 'react';
import styles from './style.module.css';
import playIcon from '../../assets/playIcon.png';
import pauseIcon from '../../assets/pauseIcon.png';

const VideoPlayer:FC<{src: string}> = function ({ src }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);

    const onPlay = ():void => {
      if (videoRef.current) {
          const video = videoRef.current;
          if (play) {
            video.pause();
          } else {
            video.play();
          }
          setPlay(!play);
      }
    };

    const onTimeUpdate = ():void => {
        if (videoRef.current) {
            const video = videoRef.current;
            const { duration } = video;
            const curTime = video.currentTime;
            setProgress((curTime / duration) * 100);
        }
    };

    const onEnded = ():void => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            setPlay(false);
            setProgress(0);
        }
    };

    return (
      <div className={styles.VideoPlayer}>
        <video
          ref={videoRef}
          className={styles.video}
          src={src}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        >
          <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
        </video>
        <div className={styles.controls}>
          <img
            className={styles.playPause}
            src={play ? pauseIcon : playIcon}
            alt="icon"
            onClick={onPlay}
          />
          <span className={styles.range}>
            <span className={styles.rangeEmpty} />
            <span
              className={styles.rangeFill}
              style={{ width: `${progress}%` }}
            />
          </span>
          <span className={styles.durations}>
            <span className={styles.durLeft}>
              {videoRef.current && `${getTimeFormat(videoRef.current.currentTime)}/`}
            </span>
            <span className={styles.durTotal}>
              {videoRef.current && getTimeFormat(videoRef.current.duration)}
            </span>
          </span>
        </div>
      </div>
    );
};

const getTimeFormat = (total:number):string => {
  let secs = total;
  const h = Math.floor(secs / 3600);
  secs -= h * 3600;
  const m = Math.floor(secs / 60);
  secs -= m * 60;
  const s = Math.round(secs);
  let res = '';
  if (h > 0) { res += h <= 9 ? `0${h}:` : `${h}:`; }
  if (m >= 0) { res += m <= 9 ? `0${m}:` : `${m}:`; }
  if (s >= 0) { res += s <= 9 ? `0${s}` : `${s}`; }
  return res;
};

export default VideoPlayer;
