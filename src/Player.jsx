import { useRef } from "react";
import songsData from "./audioFiles";

const Player = ({
  songs,
  setSongs,
  isplaying,
  setIsplaying,
  audioElem,
  currentSong,
  setCurrentSong,
}) => {
  const clickPos = useRef();
  const playPause = () => {
    setIsplaying(!isplaying);
  };
  const changeProgress = (e) => {
    let width = clickPos.current.clientWidth;
    let offset = e.nativeEvent.offsetX;
    let divprogress = (offset / width) * 100;
    audioElem.current.currentTime =
      (divprogress / 100) * currentSong.songlength;

    console.log(audioElem.current.currentTime);
  };
  const previous = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };
  const nextSong = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };
  return (
    <>
      <div className="container">
        <h3>music player</h3>
        <div className="title">
          <p>{currentSong.title}</p>
        </div>
        <div className="navigator" ref={clickPos} onClick={changeProgress}>
          <div
            className="bar"
            style={{ width: `${currentSong.progress}%` }}
          ></div>
        </div>
        <div className="controls">
          <div className="prev" onClick={previous}>
            prev
          </div>
          <div className={isplaying ? "pause" : "play"} onClick={playPause}>
            {isplaying ? "pause" : "play"}
          </div>
          <div className="next" onClick={nextSong}>
            next
          </div>
        </div>
      </div>
    </>
  );
};
export default Player;
