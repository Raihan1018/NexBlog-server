// api/server.js
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ======= DATABASE CONNECTION =======
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("myDB");
    const blogCollection = db.collection("blogs");

    // ---------- YOUR ROUTES -----------

    // GET all blogs
    app.get("/blogs", async (req, res) => {
      const blogs = await blogCollection.find().toArray();
      res.send(blogs);
    });

    // GET single blog
    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const blog = await blogCollection.findOne({ _id: new ObjectId(id) });
      res.send(blog);
    });

    // POST blog
    app.post("/blogs", async (req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog);
      res.send(result);
    });

    // PUT update blog
    app.put("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const updated = req.body;
      const result = await blogCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updated }
      );
      res.send(result);
    });

    // DELETE blog
    app.delete("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Health Test Route
    app.get("/", (req, res) => {
      res.send("Server is running on Vercel!");
    });
  } catch (err) {
    console.error(err);
  }
}
run();
module.exports = app;
