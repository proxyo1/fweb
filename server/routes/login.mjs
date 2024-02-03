import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, password } = req.body;

  // Check if the name exists in your records collection
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
    res.status(401).json({ message: "Invalid name or password" });
  }
});

export default router;
