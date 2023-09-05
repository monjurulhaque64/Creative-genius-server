const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1cvgdrp.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
    //   await client.connect();
  
      const reviewsCollection = client.db("CreativeCampus").collection("Reviews");
  
  

    //   reviews api 

      app.get('/reviews', async (req, res) => {
          const result = await reviewsCollection.find().toArray();
          res.send(result);
      })


      app.post('/reviews', async (req, res) => {
        const newReview = req.body;
        const result = await reviewsCollection.insertOne(newReview);
        res.send(result);
      })
  
  
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
  
      // await client.close();
    }
  }
  run().catch(console.dir);
  
  
  
  
  app.get('/', (req, res) => {
      res.send('Creative Campus Server is running')
    })
    
    app.listen(port, () => {
      console.log(`Creative Campus ${port}`)
    })