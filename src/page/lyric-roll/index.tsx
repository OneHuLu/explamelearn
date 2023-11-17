import React, { useEffect, useState } from "react";
import "./index.scss";
// import './lyric-roll'
import { getLyric, findIndex, lyricMovement } from "./lyric-roll";

import music from "./assets/siruxue.mp3";

export default function LyricRoll() {
  const [lyricListObj, setLyricListObj] = useState<Array<any>>([]);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [isoffset, setIsOffset] = useState(0);

  useEffect(() => {
    // 获取数据列表
    const list = getLyric();
    setLyricListObj(list);
    // 获取dom
    const audio = document.querySelector("audio");
    // 监听音频播放
    audio &&
      audio.addEventListener("timeupdate", () => {
        // 获取高亮位置
        const index = findIndex(audio.currentTime, list);
        setCurrIndex(index);

        // dom 元素获取
        const containerDom = document.querySelector(".container");
        const ulDom = document.querySelector("ul");
        // 歌词位置偏移
        const offset = lyricMovement(containerDom, ulDom, index);
        setIsOffset(offset);
      });
  }, []);

  // 设置偏移量
  console.log(isoffset);

  return (
    <div className="lyric-roll">
      <div className="audio">
        <audio controls src={music}></audio>
      </div>
      <div className="container">
        <ul
          className="lrc-list"
          style={{
            transform: `translateY(-${isoffset}px)`,
          }}
          id={`${isoffset}`}
        >
          {lyricListObj.map((item, index) => (
            <li key={index} className={currIndex == index ? "active" : ""}>
              {item?.word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
