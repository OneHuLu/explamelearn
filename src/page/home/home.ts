// 动画创建曲线函数
function createAnimation(
  scrollStart: number,
  scrollEnd: number,
  startValue: number,
  endValue: number
) {
  return function (x: number) {
    // 判断是否进入动画区域
    if (x < scrollStart) {
      return startValue;
    }
    // 判断是否离开动画区域
    if (x > scrollEnd) {
      return endValue;
    }

    const progress = (x - scrollStart) / (scrollEnd - scrollStart);
    return startValue + (endValue - startValue) * progress;
  };
}

// 获取dom元素
function getDomAnimation(
  scrollStart: number,
  scrollEnd: number,
  dom: any,
  list: any
) {
  // 根据自定义属性 做偏移
  scrollStart = scrollStart + dom.dataset.order * 600;
  // 透明度计算
  const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1);
  //   缩放计算
  const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1);
  //方块的矩形区域
  const listRect = list.getBoundingClientRect();
  //拿到方块的宽高左右距离来使方块处于一直居中状态
  const itemWidth = dom.clientWidth;
  const itemHeight = dom.clientHeight;
  const itemLeft = dom.offsetLeft;
  const itemTop = dom.offsetTop;

  const xAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    listRect.width / 2 - itemLeft - itemWidth / 2,
    0
  );
  const yAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    listRect.height / 2 - itemTop - itemHeight / 2,
    0
  );

  const opacity = function (x: any) {
    return opacityAnimation(x);
  };
  const transform = function (x: any) {
    return `translate(${xAnimation(x)}px,${yAnimation(
      x
    )}px) scale(${scaleAnimation(x)})`;
  };
  return {
    opacity,
    transform,
  };
}

// 更新动画映射
function updateMap(animationMap: any, items: any, playGround: any, list: any) {
  // 每次调用时先将之前的清除掉，窗口大小等发生改变时重新处理
  animationMap.clear();
  // 拿到蓝色部分的矩形区域,
  const playGroundRect = playGround.getBoundingClientRect();
  // 处理进入区域，计算出的该触发动画的滚动值 也就是scrollStart值
  const scrollStart = playGroundRect.top + window.scrollY;
  // 离开区域，结束距离，scrollEnd
  const scrollEnd = playGroundRect.bottom + window.scrollY - window.innerHeight;
  //防止没有方块
  if (items.length === 0) {
    return;
  }

  for (const item of items) {
    animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item, list));
  }
}

// 将map结构中的动画应用到元素上
function updateStyles(animationMap: any) {
  const scrolllY = window.scrollY;
  for (const [dom, animations] of animationMap) {
    for (const prop in animations) {
      const value = animations[prop](scrolllY);
      dom.style[prop] = value;
    }
  }
}

export { createAnimation, updateMap, updateStyles };
