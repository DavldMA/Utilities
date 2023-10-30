const express = require("express");
const ejs = require('ejs');
const path = require('path');
const util = require('util');
const urlController = require('./controllers/url'); 

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render(__dirname + '/views/pages/index');
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
