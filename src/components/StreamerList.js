import { useEffect, useState } from "react";
import Streamer from "./Streamer";

function rankings(arr) {
  const sorted = [...arr].sort((a, b) => b.score - a.score);
  return arr.map((x) => sorted.indexOf(x) + 1);
};

function StreamerList() {
  const [streamerList, setStreamerList] = useState([]);

  useEffect(() => {
    fetch("https://webcdn.17app.co/campaign/pretest/data.json")
      .then(response => {
        return response.json();
      })
      .then(json => {
        setStreamerList(json);
      });
  }, []);

  useEffect(() => {
    const changeStreamerList = setInterval(() => {
      if (streamerList && streamerList.length) {
        setStreamerList(streamerList => {
          let newStreamerList = streamerList;
          let sorted = rankings(newStreamerList);
          for (let i = 0; i < newStreamerList.length; i++) {
            newStreamerList[i].id = i + 1;
            let randNum = Math.ceil(Math.random() * 999) * (Math.round(Math.random()) ? 1 : -1);
            newStreamerList[i].oldScore = newStreamerList[i].score;
            newStreamerList[i].score = Math.max(newStreamerList[i].score + randNum, 0);
            newStreamerList[i].oldRank = newStreamerList[i].rank;
            newStreamerList[i].rank = sorted[i];
          }
          return [...newStreamerList];
        });
      }
    }, 1000);
    return () => {
      clearInterval(changeStreamerList);
    };
  }, [streamerList]);

  return (
    <div className="StreamerList">
      {streamerList.map((streamer) =>
        <Streamer streamer={streamer} key={streamer.userID}/>
      )}
    </div>
  );
}

export default StreamerList;
