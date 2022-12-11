const socketio = require('socket.io');
const express = require('express');
const path = require('path');
const app = require('./app');
const job = require('./scheduled/updateStocks');

const port = process.env.PORT || 8080;
const host = process.env.HOSTNAME || 'localhost';

job.start();

console.log(`env: ${process.env.node_env}`);
if (process.env.node_env === 'production') {
  app.use(express.static(path.join(__dirname, 'client.v2', 'build')));
  app.get('*', (req, res) => {
    console.log(`port: ${process.env.PORT}`);
    res.sendFile(path.join(__dirname, 'client.v2', 'build', 'index.html'));
  });
}
const server = app.listen(port, () => {
  console.log(`Node.js API server is listening on http://${host}:${port}/`);
});

const io = socketio(server);
io.on('connection', () => {
  console.log('soocket io Connected!');
});
app.set('io', io);
