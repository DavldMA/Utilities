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
    res.render(__dirname + '/views/pages/index.ejs');
});


app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    if (shortID.length < 2) {
        return
    } 
    var link = await urlController.findRedirectURL(shortID);
    res.redirect(link)
});

app.post('/url', async (req, res) => {
    //TODO implement link verifier
    let linkUrl = await urlController.generateNewShortURL(req, res);
    linkUrl = "https://personalutils.vercel.app/" + linkUrl
    res.render(__dirname + '/views/pages/url.ejs', { linkURL: linkUrl} );
});

async function test(){
    await urlController.deleteAllFromDB();
}


app.listen(8801, () => console.log("started"))
