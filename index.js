const express = require("express");
const urlController = require('./controllers/url'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    var link = await urlController.findRedirectURL(shortID);
    res.redirect(link)
});

app.post('/url', async (req, res) => {
    urlController.generateNewShortURL(req, res);
});

app.listen(8801, () => console.log("started"))
