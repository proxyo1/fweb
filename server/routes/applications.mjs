import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("applications");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/",async (req,res) =>{
    let newDocument = {
        email: req.body.email,
        admin_no: req.body.admin_no,
        app_desc: req.body.app_desc
    }
    let collection = await db.collection("applications")
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);});

export default router;
