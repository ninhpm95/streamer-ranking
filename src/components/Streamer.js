import { useEffect, useRef, useState } from "react";

function Streamer({streamer}) {
  const streamerRef = useRef(streamer);
  streamerRef.current = streamer;
  streamer.oldScore = streamer.oldScore | streamer.score;
  const [displayedScore, setDisplayedScore] = useState(streamer.oldScore);

  useEffect(() => {
    const changeDisplayedScore = setInterval(() => {
      setDisplayedScore((displayedScore) => {
        if ((displayedScore <= streamerRef.current.score && streamerRef.current.score <= streamerRef.current.oldScore) ||
            (displayedScore >= streamerRef.current.score && streamerRef.current.score >= streamerRef.current.oldScore)) {
          return streamerRef.current.score;
        } else {
          let jump = streamerRef.current.score - streamerRef.current.oldScore;
          return Math.round(displayedScore + jump/5);
        }
      });
    }, 100);
    return () => {
      clearInterval(changeDisplayedScore);
    };
  }, []);

  return (
    <div className="Streamer" id={`streamer-${streamer.id}`} style={{ top: 50 * streamer.rank + "px" }}>
      <span className="rank">{streamer.rank}</span>      
      <img  className="profilePic" src={streamer.picture} alt="streamer"></img>
      <span className="displayName">{streamer.displayName}</span>
      <span className="score">{displayedScore}pt</span>
    </div>
  );
}

export default Streamer;
