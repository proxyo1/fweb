import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import { cookieJwtAuth } from "../middleware/auth.mjs";

const router = express.Router();

// Create an announcement
router.post("/",cookieJwtAuth, async (req, res) => {
  try {
    // Get current date and format it as YY-MM-DD
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;

    const newAnnouncement = {
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      // Use the formattedDate for the date field
      date: formattedDate
    };

    const collection = await db.collection("announcements");
    const result = await collection.insertOne(newAnnouncement);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error creating an announcement:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Get all announcements
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("announcements");
    const results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a single announcement by id
router.get("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("announcements");
    const result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Update an announcement
router.patch("/:id",cookieJwtAuth, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;

    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        date: formattedDate // Set the date to today's date
      }
    };

    const collection = await db.collection("announcements");
    const result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Delete an announcement
router.delete("/:id",cookieJwtAuth, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("announcements");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send("Announcement deleted");
    }
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
