import Vue from 'vue';
import App from './App.vue';
import VueSocketio from 'vue-socket.io';

import store from './store';

Vue.use(VueSocketio, 'http://192.168.0.93:3000');

new Vue({
	el: '#app',
	store,
	render: h => h(App)
})
