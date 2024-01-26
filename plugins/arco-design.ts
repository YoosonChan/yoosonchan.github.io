import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

export default defineNuxtPlugin((NuxtApp)=> {
  NuxtApp.vueApp.use(ArcoVue)
})