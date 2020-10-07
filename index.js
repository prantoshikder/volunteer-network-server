const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectID;

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jf95v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(cors());
app.use(bodyParser.json());
const port = 5000


// volunteerNetwork volunteerNetwork95

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const listCollection = client.db("volunteer").collection("list");
    console.log(err);

    app.post('/addList', (req, res) => {
        const newList = req.body;
        listCollection.insertOne(newList)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
        console.log(newList);
    })

    app.get('/listItem', (req, res) => {
        listCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.delete('/delete/:id', (req, res) => {
        console.log(req.params.id);
        listCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0);
                // console.log(result);
            })
    })
});





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)