import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error("Error in GET /users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    console.error("Error in GET /users/:id:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      number: req.body.number,
      admin_no: req.body.admin_no,
      image: req.body.image
    };

    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res.status(200).send(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key violation
      const duplicateKey = Object.keys(error.keyValue)[0];
      res.status(409).send(`'${error.keyValue[duplicateKey]}' is already used.`);
    } else {
      // Other errors
      console.error("Error inserting document:", error);
      res.status(500).send("Internal Server Error");
    }
  }
});



// router.patch
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        number: req.body.number,
        admin_no: req.body.admin_no,
        image: req.body.image
      },
    };
    let collection = await db.collection("users");
    let result;

    try {
      result = await collection.updateOne(query, updates);
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key violation
        const duplicateKey = Object.keys(error.keyValue)[0];
        return res.status(409).send(`'${error.keyValue[duplicateKey]}' is already used.`);
      } else {
        // Other errors
        console.error("Error updating document:", error);
        return res.status(500).send("Internal Server Error");
      }
    }

    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;