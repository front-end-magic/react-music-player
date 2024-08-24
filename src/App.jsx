import { useState, useRef, useEffect } from "react";
import "./App.css";
import songsData from "./audioFiles.jsx";
import Player from "./Player";

function App() {
  const [songs, setSongs] = useState(songsData);
  const [isplaying, setIsplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsData[2]);
  const audioElem = useRef();
  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying, currentSong]);
  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      songlength: duration,
    });
  };

  return (
    <>
      <div>
        <audio
          src={currentSong.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        ></audio>
        <Player
          songs={songs}
          setSongs={setSongs}
          isplaying={isplaying}
          setIsplaying={setIsplaying}
          audioElem={audioElem}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </>
  );
}

export default App;
