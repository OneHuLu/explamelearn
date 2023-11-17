//
const lrc = `[00:02.36]词：董真/魏佳敏
[00:03.78]曲：董真/Tureleon
[00:03.91]编曲：Tureleon
[00:04.01]萧：Dungeon
[00:04.46]录音缩混：郑昊杰
[00:05.31]制作人：董真
[00:33.04]那眼神如此熟悉
[00:34.87]让人着迷无力抗拒
[00:40.00]一次又一次相遇
[00:41.88]在眼前却遥不可及
[00:47.16]命运总爱淘气 将一切都藏匿
[00:54.26]曾有你的回忆 无痕迹
[01:00.82]若不是心心相吸
[01:02.90]又怎么会一步一步靠近
[01:07.77]莫名泛起的甜蜜
[01:09.70]在每一个夜里更清晰
[01:15.01]命运总来不及 将一切都美丽
[01:20.67]我真的愿意 用一生换你铭记
[01:27.57]对不起 多想说声对不起
[01:34.61]也许分离也是另一种相聚
[01:41.46]遇见你的我多幸运
[01:44.96]是否可以不辞而行
[01:48.80]舍不得仍决绝离去
[01:55.40]对不起 多想说声对不起
[02:02.35]只要相信这是我们的默契
[02:09.35]用尽了所有的力气
[02:12.89]才能转身不看不听
[02:16.66]爱是往后余生唯一的确定
[02:51.99]雨丝丝滴入眉间
[02:53.99]千里之外的思念是否听见
[02:58.94]呢喃一遍又一遍
[03:00.98]镌刻心间无声缠绵
[03:06.38]镌刻谁的执念 往事一幕一幕
[03:12.24]那刻骨相思 越无力越清醒
[03:19.10]人世间 多难得红颜知己
[03:25.82]欲说还休停在你走的那天
[03:32.86]如果老天随人所愿
[03:36.28]你就是我心中所愿
[03:40.12]用余生赌下一个明天
[03:46.78]人世间 多难得红颜知己
[03:53.65]记忆停在你笑颜一如从前
[04:00.56]如果老天随人所愿
[04:04.11]你就是我心中所愿
[04:08.00]说好下次相遇
[04:10.22]永不说再见
`;

function getLyric() {
  // 歌词转换 str => list
  const lrcList = lrc.split("\n");

  // 转换成time:[歌词]
  const lrcListObj = lrcList
    .map((item) => {
      // 字符切分
      const TimeAndWord = item.split("]");
      const time = dealTimeToMs(TimeAndWord[0]);
      const word = TimeAndWord[1];
      return {
        time,
        word,
      };
    })
    .filter((item) => Object.keys(item)[0] != "undefined");
  return lrcListObj;
}

/**
 * 时间处理函数
 * @param timeStr
 * @returns
 */
function dealTimeToMs(timeStr: string) {
  const time = timeStr?.split("[")[1]?.split(":");
  if (time === undefined) return;
  // 分钟 => s
  const minu = +time[0] * 60;
  // s
  const sec = +time[1];
  return minu + sec;
}

/**
 * 计算高亮文本位置
 * @param currentTime
 * @param lyricListObj
 * @returns
 */
function findIndex(currentTime: number, lyricListObj: any) {
  const index = lyricListObj?.findIndex((item: any, index: number) => {
    if (currentTime < lyricListObj[index + 1]?.time) {
      return index;
    }
  });
  return index;
}

/**
 *
 * @param ulDom ul的dom元素
 * @param liDom li
 */
function lyricMovement(containerDom: any, ulDom: any, index: number) {
  //   console.log(containerDom.clinetHeight, ulDom.children[0].clinetHeight);
  const lrcHeight = ulDom.children[0].clientHeight;
  const containerHeight = containerDom.clientHeight;
  //   最大偏移量
  const maxOffset = ulDom.clinetHeight - containerHeight;
  // 偏移量
  let offset = lrcHeight * index + lrcHeight / 2 - containerHeight / 2;
  //边界处理
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  return offset;
}

export { getLyric, findIndex, lyricMovement };
