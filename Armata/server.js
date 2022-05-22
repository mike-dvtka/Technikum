var fs = require('fs');
var qs = require('querystring');
var http = require('http');
var socketio = require('socket.io')(server);
var users = [];

var server = http.createServer(function (req, res) {
	switch (req.method) {
		case 'GET':
			if (req.url === '/') {
				fs.readFile('static/index.html', function (error, data) {
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.write(data);
					res.end();
				});
			} else if (req.url === '/js/Armata.js') {
				fs.readFile('static/js/Armata.js', function (error, data) {
					res.writeHead(200, { 'Content-Type': 'application/javascript' });
					res.write(data);
					res.end();
				});
			} else if (req.url === '/js/Main.js') {
				fs.readFile('static/js/Main.js', function (error, data) {
					res.writeHead(200, { 'Content-Type': 'application/javascript' });
					res.write(data);
					res.end();
				});
			} else if (req.url === '/js/Kula.js') {
				fs.readFile('static/js/Kula.js', function (error, data) {
					res.writeHead(200, { 'Content-Type': 'application/javascript' });
					res.write(data);
					res.end();
				});
			} else if (req.url === '/js/Siatka.js') {
				fs.readFile('static/js/Siatka.js', function (error, data) {
					res.writeHead(200, { 'Content-Type': 'application/javascript' });
					res.write(data);
					res.end();
				});
			} else if (req.url === '/js/OrbitControls.js') {
				fs.readFile('static/js/OrbitControls.js', function (error, data) {
					res.writeHead(200, { 'Content-Type': 'application/javascript' });
					res.write(data);
					res.end();
				});
			} else {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.write('<h1>404 - brak takiej strony</h1>');
				res.end();
			}
			break;

		case 'POST':
			servResponse(req, res);

			break;
	}
});

server.listen(3000, function () {
	console.log('A R M A T A');
});

var io = socketio.listen(server); // server -> server nodejs

io.sockets.on('connection', function (client) {
	console.log('klient się podłączył' + client.id);
	// client.id - unikalna nazwa klienta generowana przez socket.io
	client.emit('onconnect', {
		clientName: client.id,
	});
	client.on('disconnect', function () {
		console.log('klient się rozłącza');
	});
	client.on('mouseposition', function (data) {
		console.log(data.posX + ' - ' + data.posY);
		io.sockets.emit('mouseposition', { posX: data.posX, posY: data.posY });
	});
});
