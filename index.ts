import { Request, Response } from 'express';

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

import { Server } from 'socket.io';

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

app.post('/new-version', (req: Request, res: Response) => {
	const newVersion = req.body.version;
	io.emit('new-version', newVersion);
	res.sendStatus(200);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Le serveur est en écoute sur le port ${port}`);
});
