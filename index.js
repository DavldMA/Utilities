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

const limiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 1, // Allow 1 request per 10 seconds per IP
});

app.get('/', function (req, res) {
    res.render(__dirname + '/views/pages/index.ejs');
});


app.use('/:shortID', limiter);
app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    if (shortID.length < 2) {
        return
    } 
    var link = await urlController.findRedirectURL(shortID);
    res.redirect(link)
});

app.post('/url', async (req, res) => {
    let linkUrl = await urlController.generateNewShortURL(req, res);
    linkUrl = "https://personalutils.vercel.app/" + linkUrl
    res.render(__dirname + '/views/pages/url.ejs', { linkURL: linkUrl} );
});

async function test(){
    await urlController.deleteAllFromDB();
}

test()

app.listen(8801, () => console.log("started"))
