const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || '5000'

app.use(cors())
app.use(express.json())


// community_repair
// 24WJPS1QvwuovzSJ


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://community_repair:24WJPS1QvwuovzSJ@cluster0.e9gq9mr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const addServiceCollection = await client.db('RepairDb').collection('addServices')





    app.post('/addServices', async(req,res)=>{
        const service = req.body
        const result = await addServiceCollection.insertOne(service)
        res.send(result)
    })

    app.get('/addServices', async(req,res)=>{
        const result = await addServiceCollection.find().toArray()
        res.send(result)
    })




    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('Hello World my kingdom')
})
app.listen(port,()=>{
    console.log(`simple crud is running on ${port}`)
})