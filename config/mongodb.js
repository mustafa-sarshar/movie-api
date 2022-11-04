const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user1:user1password@cluster0.nmyfigr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("moviesDB").collection("movies");
  // perform actions on the collection object
  client.close();
});
