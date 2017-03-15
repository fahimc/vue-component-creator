module.exports = {
  html: '<div class="{componentName}"></div>',
  vue: '<template src="./template/template.html">\n</template><script src="./src/component.js">\n</script><style lang="scss" scoped src="./style/style.scss"></style>',
  js: 'export default {\nname: \'{componentName}\'\n};',
  appHTML: '<div id="app"><router-view></router-view></div>',
  style:'.{componentName}{\n}',
  appStyle:'#app{\n}'
};
