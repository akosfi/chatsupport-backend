import express from "express";

const app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.send("Hello Worlasdd")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
});