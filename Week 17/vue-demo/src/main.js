/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-17 13:38:19
 * @LastEditTime: 2021-02-17 14:24:44
 * @Description: file content
 */
import Vue from "vue";
import App from "./Hello.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});