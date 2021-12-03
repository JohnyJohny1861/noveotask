import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import UploadVideo from './components/UploadVideo/index';
import VideoList from './components/VideoList';

import { getVideoFiles } from './components/VideoList/query';

const testVideos = [
  { 
    name: 'Elephants Dream', 
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }, 
  { 
    name: 'Big Buck Bunny', 
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  { 
    name: 'For Bigger Blazes',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
];

function App() {
  const [alertMsg, setAlertMsg] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<{name: string, url: string}[]>(testVideos);

  useEffect(() => {
    let cancel = false;
    !cancel && getVideos();
    return () => { cancel = true; }
  }, []);

  useEffect(() => {
    let timer: any;
    if(alertMsg) {
      timer = setTimeout(() => { setAlertMsg(undefined) }, 3000);
    }
    return () => { clearTimeout(timer) }
  }, [alertMsg]);

  let getVideos = async() => {
    setLoading(true);
    const { data, error } = await getVideoFiles();
    if(data) {
      setVideos(data);
    } else if(error) {
      setAlertMsg(error);
    }
    setLoading(false);
  }

  const onFileUploaded = useCallback(() => {
    getVideos();
  }, [])
  
  return (
    <div className={styles.App}>
      <UploadVideo onFileUploaded={onFileUploaded} />
      <VideoList loading={loading} videos={videos} alertMsg={alertMsg} />
    </div>
  );
}

export default App;
