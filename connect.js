const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();


const uri = `mongodb+srv://${process.env.USERNAME_MONGO_DB}:${process.env.PASSWORD_MONGO_DB}@cluster0.tcwz5eh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const databaseName = 'url';

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(databaseName);

        return db;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

async function disconnectFromMongoDB() {
    try {
        await client.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
    }
}

module.exports = {
    connectToMongoDB,
    disconnectFromMongoDB,
};
