import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery'

Vue.use(Vuex);

const state = {
	joined: false,
	user: {
		name: '',
		room: ''
	},
	messages: [],
	rooms: []
};

const mutations = {
	setJoined(state, payload) {
		state.joined = payload;
	},
	addMessage(state, payload) {
		console.log(payload)
		state.messages.push(payload);
	},
	clearMessages(state) {
		state.messages = [];
	},
	getRooms(state, payload) {
		state.rooms = payload
	}
};

const actions = {
	setJoined({ commit, state }, payload) {
		commit('setJoined', payload);
	},
	addMessage({ commit, state }, payload) {
		commit('addMessage', payload);
	},
	clearMessages({ commit, state }) {
		commit('clearMessages');
	},
	getRooms({ commit, state }) {
		$.get('//192.168.0.93:3000/rooms')
		.then(payload => {
			commit('getRooms', payload)
		})
	}
};

const getters = {
	messages: (state) => {
		return state.messages;
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
    strict: true
});