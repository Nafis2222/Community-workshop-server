const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || '5000'

app.use(cors())
app.use(express.json())


// community_repair
// 24WJPS1QvwuovzSJ


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const BookedServiceCollection = await client.db('RepairDb').collection('bookedServices')
    const OurServiceCollection = await client.db('RepairDb').collection('ourServices')

    // bookedServices

    app.post('/bookedServices', async(req,res)=>{
        const book = req.body
        const result = await BookedServiceCollection.insertOne(book)
        res.send(result)
    })

    app.get('/bookedServices', async(req,res)=>{
        const result = await BookedServiceCollection.find().toArray()
        res.send(result)
    })






    // addServices


    app.post('/addServices', async(req,res)=>{
        const service = req.body
        const result = await addServiceCollection.insertOne(service)
        res.send(result)
    })

    app.get('/addServices', async(req,res)=>{
        const result = await addServiceCollection.find().toArray()
        res.send(result)
    })


    app.delete('/addServices/:id', async(req,res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result  = await addServiceCollection.deleteOne(query)
        res.send(result)
    })

    app.put('/addServices/:id', async(req,res)=>{
        const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updatedUSer = {
        $set: {
          name: data.name,
        },
      };

      const result = await addServiceCollection.updateOne(
        filter,
        updatedUSer,
        options
      );
      res.send(result)
    })




    // Time to get our services details here as well

    app.get('/ourServices' , async(req,res)=>{
      const result = await OurServiceCollection.find().toArray()
      res.send(result)
    })

    app.get('/ourServices/:id', async(req,res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await OurServiceCollection.findOne(query)
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