import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";


import {router as appRouter} from './routes';

const db = require('./db/models'); //TODO migrate sequelize to typescript

const app = express();

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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
});