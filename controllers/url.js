const shortid = require("shortid");
const { connectToMongoDB, disconnectFromMongoDB, findRedirectURLByShortId, deleteAllDocumentsInUrlCollection } = require('../connect');

async function generateNewShortURL(req, res) {
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ error: 'url is required' });
    }

    const shortID = shortid();
    const db = await connectToMongoDB();
    
    try {
        const urlCollection = db.collection('url');
    
        const result = await urlCollection.insertOne({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
        
        if (result && result.insertedId) {
            return shortID;
        } else {
            return res.status(500).json({ error: 'Failed to create a new short URL' });
        }
    } catch (error) {
        console.error('Error creating a new short URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        await disconnectFromMongoDB();
    }
}

async function findRedirectURL(shortID) {
    var xd = await findRedirectURLByShortId(shortID);
    return xd
}

async function deleteAllFromDB() {
    await deleteAllDocumentsInUrlCollection()
}

module.exports = {
    generateNewShortURL, findRedirectURL, deleteAllFromDB
};
