import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"
import speakeasy from "speakeasy"
import QRCode from "qrcode"

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

router.post("/", async (req, res) => {
    // Generate a unique secret for 2FA
    const secret = speakeasy.generateSecret({length: 20});
    let newDocument = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        twoFactorSecret: secret.base32 // Store the secret in your DB
    };

    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);

    // Generate a QR code that user can scan with a 2FA app
    QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
        // Send QR code and success status
        res.json({
            result: result,
            qrCode: data_url
        }).status(200); // Changed status code to 200 for successful operation
    });
});

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

    res.send(result).status(200)
})

router.post('/:_id/verify', async (req, res) => {
    const { token } = req.body;
    const { _id } = req.params;
    
    const collection = await db.collection("records");
    const user = await collection.findOne({ _id: new ObjectId(_id) });
    console.log(user)
    
    if (!user) {
        return res.status(404).send('User not found');
    }
    
    // Verify the token
    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: token,
    });
    
    if (verified) {
        // Optionally update the user's document to indicate 2FA is setup successfully
        res.send({ verified: true });
    } else {
        res.status(400).send({ verified: false, message: "Invalid token" });
    }
});
export default router