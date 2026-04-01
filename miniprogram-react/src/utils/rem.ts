/**
 * rem 适配方案
 * 设计稿宽度: 375px
 * 1rem = 37.5px (即 10rem = 375px)
 */

export function initRem() {
  const baseWidth = 375; // 设计稿宽度
  const baseFontSize = 37.5; // 基准字体大小 (1rem = 37.5px)

  function setRem() {
    const width = document.documentElement.clientWidth || window.innerWidth;
    // 限制最大宽度为 540px (iPad 等大屏设备)
    const maxWidth = 540;
    const clientWidth = Math.min(width, maxWidth);
    
    // 计算 rem 基准值
    const fontSize = (clientWidth / baseWidth) * baseFontSize;
    document.documentElement.style.fontSize = `${fontSize}px`;
  }

  // 初始化
  setRem();

  // 监听窗口大小变化
  window.addEventListener('resize', setRem);
  window.addEventListener('orientationchange', setRem);

  // 页面显示时重新计算
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setRem();
    }
  });
}

/**
 * px 转 rem
 * @param px - 像素值
 * @returns rem 字符串
 */
export function px2rem(px: number): string {
  return `${px / 37.5}rem`;
}

/**
 * rem 转 px
 * @param rem - rem 值
 * @returns 像素值
 */
export function rem2px(rem: number): number {
  const fontSize = parseFloat(document.documentElement.style.fontSize) || 37.5;
  return rem * fontSize;
}
