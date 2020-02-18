import express from "express";
import {router as messageRouter} from './routes/messages';
import {router as authenticationRouter} from './routes/authentication';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/api/messages', messageRouter);
app.use('/chat', messageRouter);
app.use('/', authenticationRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
});



/*

GET /login
POST /login
GET /register
POST /register

GET /chats
GET /create-chat
GET /chat/{id:int}

//api - from client
GET /api/messages/ -gets pending messages
POST /api/messages/ -send message 

*/