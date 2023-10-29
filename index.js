const express = require("express");
const shortid = require("shortid");
const { connectToMongoDB, disconnectFromMongoDB } = require('./connect');
const urlController = require('./controllers/url'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/:shortID', (req, res) => {
    res.send("prontos")
})
app.post('/url', async (req, res) => {
    urlController.generateNewShortURL(req, res);
});



//app.use("/url", urlRoute);
app.listen(8801, () => console.log("started"))
