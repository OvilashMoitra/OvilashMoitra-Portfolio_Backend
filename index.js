const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xplf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        app.get('/projects', async (req, res) => {
            const projectsCollection = client.db("portfolio").collection("projects");
            const query = {}
            const cursor = projectsCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        })

    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my node CRUD server')
})

app.listen(port, () => {
    console.log('crud server is running ');
})