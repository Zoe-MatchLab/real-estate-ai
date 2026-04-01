export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度 375px，1rem = 37.5px
      propList: ['*'], // 转换所有属性
      selectorBlackList: ['.norem'], // 忽略 .norem 开头的类名
      minPixelValue: 2, // 最小转换单位
      exclude: /node_modules/i, // 排除 node_modules
    },
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8'],
    },
  },
};
