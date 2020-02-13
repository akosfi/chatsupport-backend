import express from "express";
import {router as messageRouter} from './routes/messages';

const app = express();


app.use(express.static(__dirname + '/public'));
app.use('/chat/messages', messageRouter);


app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
});