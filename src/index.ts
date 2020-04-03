import express from "express";
import _http from "http";
import _io from "socket.io";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import {router as appRouter} from './routes';
import socketController from './socket';

const app = express();
const http = _http.createServer(app);
const io = _io(http);


app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => res.sendFile(__dirname + '/public/admin/index.html'));
app.use('/api', appRouter);
//io.on('connection', socketController);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});