import { useState, useEffect } from 'react';
import styles from './App.module.css';
import UploadVideo from './components/UploadVideo/index';
import VideoList from './components/VideoList';

import { getVideoFiles } from './components/VideoList/query';
import { VideosType } from './components/VideoList/types';
import Alert from './UI/Alert';
import {Props as AlertType} from './UI/Alert/types';

const testVideos = [
  { 
    id: 1,
    name: 'Elephants Dream', 
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }, 
  { 
    id: 2,
    name: 'Big Buck Bunny', 
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  { 
    id: 3,
    name: 'For Bigger Blazes',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
];

function App() {
  const [alert, setAlert] = useState<AlertType>({msg: '', type: ''});
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<VideosType>(testVideos);

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if(alert) {
      timer = setTimeout(() => { setAlert({msg: '', type: ''}) }, 3000);
    }
    return () => { clearTimeout(timer) }
  }, [alert]);

  let getVideos = async() => {
    setLoading(true);
    const { data, error } = await getVideoFiles();
    if(data) {
      setVideos(data);
    } else if(error) {
      setAlert({msg: error, type: 'danger'});
    }
    setLoading(false);
  }
  
  return (
    <div className={styles.App}>
      <Alert {...alert} />
      <UploadVideo 
        onFileUploaded={getVideos} 
        setAlert={setAlert}
        setLoading={setLoading}
      />
      <VideoList 
        loading={loading} 
        videos={videos} 
      />
    </div>
  );
}

export default App;
