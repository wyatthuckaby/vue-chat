<template>
	<div>
		<div class="title">
			<h3>tête-à-tête-à-tête</h3>
			<h5>Three's a crowd.</h5>
		</div>
		<div v-if="!joined" class="text-center">
			<form @submit.prevent="join">
				<div class="form-group">
					<input type="text" max="12" class="form-control input-lg text-center" placeholder="Name" v-model="user.name">
					<input type="text" max="12" class="form-control input-lg text-center" placeholder="Room" v-model="user.room">
				</div>
				<button class="btn btn-primary btn-lg" type="submit">Join Chat</button>
			</form>
		</div>
		<div v-if="joined">
			<div class="chat">
				<div class="row" v-for="item in messages">
					<div class="col-sm-2 text-right">
						<span class="name">{{ item.user }}</span>
					</div>
					<div v-if="item.message.type == 'text'" class="col-sm-10">
						<span>{{ item.message.body }}</span>
					</div>
					<div v-else-if="item.message.type == 'imgurl'" class="col-sm-10">
						<span><img :src="item.message.body" class="chatimage"></span>
					</div>
					<div v-else-if="item.message.type == 'link'" class="col-sm-10">
						<span><a target="_blank" :href="item.message.body">{{ item.message.body }}</a></span>
					</div>
				</div>
			</div>
			<div class="form-group row">
				<form @submit.prevent="send">
					<div class="col-xs-8">
						<input type="text" class="form-control input-lg text-center" placeholder="Message" v-model="message.body">
					</div>
					<div class="col-xs-2">
						<select class="form-control" v-model="message.type">
								<option value="text">Text</option>
								<option value="imgurl">Image</option>
								<option value="link">Link</option>
						</select>
					</div>
					<div class="col-xs-2">
						<button class="btn btn-primary btn-lg" type="submit">Send</button>
					</div>
				</form>

			</div>
			<div class="text-center">
				<button class="btn btn-danger btn-lg" type="button" @click="leave">Leave Chat</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'app',
		data: function () {
			return {
				user: {
					name: '',
					room: ''
				},
				message: {
					body: '',
					type: 'text'
				}
			}
		},
		computed: mapState({
			joined(state) {
				return state.joined;
			},
			messages(state) {
				return state.messages;
			}
		}),
		methods: {
			join: function () {
				if (this.user.name) {
					this.$store.dispatch('setJoined', true);
					this.$socket.emit('join', this.user);
				}
			},
			leave: function () {
				this.$store.dispatch('setJoined', false);
				this.$store.dispatch('clearMessages');
				this.$socket.emit('leave');
			},
			send: function (message) {
				if (message) {
					this.$socket.emit('message', this.message);
					this.message = {
						body: '',
						type: 'text'
					}
				}
			}
		},
		sockets: {
			join: function (name) {
				console.log("Joined");
				var data = { user: name.name, message: {body: 'Has joined the room.', type: 'text'} };
				this.$store.dispatch('addMessage', data);
			},
			left: function (name) {
				var data = { user:  name.name, message:  {body: 'Has left the room.', type: 'text'} };
				this.$store.dispatch('addMessage', data);
			},
			message: function (data) {
				this.$store.dispatch('addMessage', data);
			}
		}
	}

</script>

<style>

	.title {
		text-align: center;
		color: slateblue;
		font-family: 'Quicksand', sans-serif;
		font-weight: bold;
	}

	.title h3 {
		font-size: 50px;
	}

	.title h5 {
		font-size: 20px;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	.chatimage {
		max-width: 800px;
	}

	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}

	.chat {
		border: 1px solid #ccc;
		border-radius: 6px;
		padding: 10px;
		margin-bottom: 10px;
		overflow-x: hidden;
		overflow-y: scroll;
		height: 500px;
	}

	.name {
		font-size: 15px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.message {
		border-radius: 5px !important;
		background: #E0EDFF;
		padding: 5px 12px;
		margin: 3px;
		font-size: 15px;
	}

	.row {
		margin-bottom: 5px;
	}
</style>