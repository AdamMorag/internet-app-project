const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const io = require('socket.io')(http);
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');
const dbAccess = require('./server/routes/dbAccess');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});



//Set Port
const port = process.env.PORT || '80';
app.set('port', port);

const server = http.createServer(app);

io.listen(server);

let usersDictionary = {};

io.on('connection', function (socket) {
    usersDictionary[socket.handshake.query.loggeduser] = socket;
    console.log(JSON.stringify(socket.handshake.query.loggeduser));
    console.log('a user connected');

    socket.on('disconnect', function () {
        delete usersDictionary[socket.handshake.query.loggeduser];
        console.log('user disconnected');
    });

    socket.on('boardUpdated', function(data) {
        console.log("board updated, id: " + data.boardId);
        dbAccess.getBoardById(data.boardId).then(board => {            
            board.boardMembers.map(u => u.uid).forEach(uid => {
                if (usersDictionary[uid] && uid !== data.userUpdating) {
                    usersDictionary[uid].emit('needToUpdateBoard', data.boardId);                    
                }
            });
        })
    })
});

server.listen(port, () => console.log(`Running on localhost:${port}`));
