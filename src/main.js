import './components/div_cpn'
import {createApp} from 'vue'
import Hello from "./vue-dir/hello.vue";


createApp(Hello).mount('#app')

console.log(test_definePlugin, process.env.NODE_ENV)

// 如果开启了热模块，并且更新了 ./components/div_cpn.js 下的这个文件，则不会刷新浏览器，而只更新这个div_cpn.js相关的模块，不会造成浏览器性能浪费
if (module.hot) {
  module.hot.accept('./components/div_cpn.js', function () {
    console.log('div_cpn更新了');
  })
}
