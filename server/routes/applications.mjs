import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("applications");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      email: req.body.email,
      admin_no: req.body.admin_no,
      app_desc: req.body.app_desc
    };
    let collection = await db.collection("applications");
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key violation
      const duplicateKey = Object.keys(error.keyValue)[0];
      return res.status(409).send(`'${error.keyValue[duplicateKey]}' is already used.`);}
      else {
    console.error("Error creating application:", error);
    res.status(500).send("Internal Server Error");
  }}
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the id from the request parameters
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }
    const collection = await db.collection("applications");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      // No document found with that ID
      return res.status(404).send("Application not found");
    }
    // Successfully deleted the document
    res.status(200).send({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).send("Internal Server Error");
  }
});



export default router;
