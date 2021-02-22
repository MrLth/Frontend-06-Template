# 轮播图实现思路

1. 手势相关逻辑抽离，兼容 touch 和 mouse

   1. 相关手势

      - tap

      - flick

      - pan

   2. 利用原生事件派发

      1. new Event() / new CustomEvent()
      2. HTMLElement.dispath(event)

2. 动画相关逻辑抽离

   1. 为什么用 JS 动画

      CSS 动画无法实现暂停

   2. TimeLine

      1. raf
      2. animateQueue
      3. 每一帧执行所有 animateQueue 里的动画

   3. Animate

      1. startValue

      2. EndValue

      3. duration

      4. startTime

         (currentTime - startTime) / duration 表示进度，以进度为基准改变 value，这样无论 raf 的执行时机如何，动画总是正确的

3. 轮播图逻辑

   1. 自动轮播

      定时器定时将 animation 添加至 timeLine 执行动画

   2. 手势支持

      1. 发生手势时
         1. timeline.pause()
      2. 手势结束时
         1. 重置并重启 timeline
         2. 添加新的 animation ,  轮播图切换
         3. 重启自动轮播（定时器）





