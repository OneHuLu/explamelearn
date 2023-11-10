import React, { useEffect } from "react";
import { updateMap, updateStyles } from "./home";
import "./index.css";

export default function Home() {
  useEffect(() => {
    // 获取初始元素
    const items = document.querySelectorAll(".list-item");
    const playGround = document.querySelector(".playground");
    const list = document.querySelector(".list");
    // 创建一个 Map 映射
    const animationMap = new Map();
    // Map 更新
    updateMap(animationMap, items, playGround, list);
    // 监听变化
    updateStyles(animationMap);
    window.addEventListener("scroll", function () {
      updateStyles(animationMap);
    });
  }, []);

  return (
    <div>
      <div className="header">HEADER</div>
      <div className="playground">
        <div className="animation-container">
          <div className="list">
            <div data-order="0" className="list-item"></div>
            <div data-order="1" className="list-item"></div>
            <div data-order="2" className="list-item"></div>
            <div data-order="3" className="list-item"></div>
            <div data-order="2" className="list-item"></div>
            <div data-order="1" className="list-item"></div>
            <div data-order="0" className="list-item"></div>
            <div data-order="0" className="list-item"></div>
            <div data-order="1" className="list-item"></div>
            <div data-order="2" className="list-item"></div>
            <div data-order="3" className="list-item"></div>
            <div data-order="2" className="list-item"></div>
            <div data-order="1" className="list-item"></div>
            <div data-order="0" className="list-item"></div>
          </div>
        </div>
      </div>
      <div className="footer">FOOTER</div>
    </div>
  );
}
