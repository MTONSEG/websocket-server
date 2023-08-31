const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: '*'
	}
});

const PORT = 5000;

app.get('/', (req, res) => {
	res.send('Hello');
})

// app.get('api', (req, res) => {
// 	res.json({ mess: 'Hello' });
// })

io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);

	socket.on('message', (data) => {
		io.emit('response', data);
		console.log(data);
	})

	socket.on('disconnect', () => {
		console.log(`${socket.id} leave`);
	})
})

http.listen(PORT, () => {
	console.log('Run')
})