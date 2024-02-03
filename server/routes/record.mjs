import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"

const router = express.Router();

router.get("/", async (req, res) =>{
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
})

router.get("/:id", async (req,res) =>{
    let collection = await db.collection("records");
    let query = {_id: new ObjectId(req.params.id)}
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);

})

router.post("/",async (req,res) =>{
    let newDocument = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    let collection = await db.collection("records")
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
})

router.patch("/:id",async (req,res)=> {
    const query = { _id: new ObjectId(req.params.id)}
    const updates = {
    $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    }
    let collection = await db.collection("records");
    let result = await collection.updateOne(query,updates);
    res.send(result).status(200);
}
);

router.delete("/:id", async(req,res) =>{
    const query = { _id: new ObjectId(req.params.id)};

    const collection = db.collection("records");
    let result = await collection.deleteOne(query);
m
    res.send(result).status(200)
})

router.post("/login", async (req, res) => {
    const { name, password } = req.body;
  
    // Check if the email exists in your records collection
    const collection = await db.collection("records");
    const user = await collection.findOne({ name });
  
    if (!user) {
      res.status(401).json({ message: "Invalid name or password" });
      return;
    }
  
    // You should implement proper password hashing and validation here
    // For simplicity, I'm assuming plaintext password matching.
    if (user.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
export default router