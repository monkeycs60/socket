import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

app.use(
	cors({
		origin: 'https://localhost:8080',
	})
);

const io = new Server(server, {
	cors: {
		origin: 'https://localhost:8080',
		methods: ['GET', 'POST'],
	},
});

app.use(express.json());

let oldVersion = '1.0.0';

app.post('/new-version', (req, res) => {
	const newVersion = req.body.version;
	const password = req.headers['x-password'];

	if (password !== 'louislegrand') {
		res.status(401).send('Unauthorized');
		return;
	}

	if (newVersion > oldVersion) {
		oldVersion = newVersion;
		io.emit('new-version', newVersion);
		res.sendStatus(200);
	} else {
		res.status(400).send('New version is not greater than the old version');
	}
});

type toto = 'string';

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Le serveur est en écoute sur le port ${port}`);
});
