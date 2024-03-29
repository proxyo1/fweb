import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import speakeasy from "speakeasy";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const router = express.Router();

// Endpoint to verify username and password
router.post("/verify", async (req, res) => {
    const { name, password } = req.body;
    const collection = await db.collection("records");
    const user = await collection.findOne({ name });

    if (!user || user.password !== password) {
        res.status(401).json({ message: "Invalid name or password" });
        return;
    }

    // Assuming you handle session/token creation here if needed
    // For simplicity, this example does not include session management
    res.status(200).json({ message: "Credentials verified, proceed to 2FA", require2FA: !!user.twoFactorSecret });
});

// Endpoint to verify 2FA token
router.post("/2fa", async (req, res) => {
    const { name, token } = req.body;
    const collection = await db.collection("records");
    const user = await collection.findOne({ name });

    if (!user) {
        res.status(401).json({ message: "Session expired or invalid" });
        return;
    }

    if (user.twoFactorSecret) {
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token,
        });

        if (verified) {
          console.log('JWT Secret:', process.env.JWT_SECRET);

          // Generate JWT
          const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: '1h'}
      );

      // Set token in HTTP-only cookie
      res.cookie('token', token, {
          httpOnly: true,
          secure: true, 
          sameSite: 'strict', // Helps with CSRF protection
          maxAge: 3600000 // 1 hour
      });
            res.status(200).json({ id: user._id, name: user.name, message: "2FA verification successful" });
        } else {
            res.status(401).json({ message: "Invalid 2FA token" });
        }
    } else {
        res.status(401).json({ message: "2FA not setup for this user" });
    }
});

export default router;
