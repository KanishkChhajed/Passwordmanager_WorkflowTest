const express = require('express')
const dotenv = require('dotenv')
const bodypaser = require('body-parser')
const { MongoClient } = require('mongodb');
const cors = require('cors')

dotenv.config()

// Connection URL
const url = process.env.MONGO_URI;


// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodypaser.json())
app.use(cors())

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

 client.connect()

    // const db = client.db(dbName);

    // Define routes here
    app.get('/', async(req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.find({}).toArray();
      res.json(findResult)
    })
    
    // Save a password in db
    app.post('/', async(req, res) => {
      const password = req.body
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.insertOne(password);
      res.send({success: true, result: findResult})
    });

// Get all the passwords



// Delete a password by id 
app.delete('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success: true, result: findResult})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 