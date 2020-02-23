import express from "express";
import _http from "http";
import _io from "socket.io";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import {router as appRouter} from './routes';
const db = require('./db/models'); //TODO migrate sequelize to typescript

const app = express();
const http = _http.createServer(app);
const io = _io(http);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'tuti5os',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 600000)
    }
}));
app.use(appRouter);

io.on('connection', function(socket){
    console.log('a user connected');
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});