// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTool from './PageTool'
export default {
  install (Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTool', PageTool)
  }
}
