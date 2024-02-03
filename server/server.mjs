import express from "express";
import cors from "cors";
import records from "./routes/record.mjs";
import users from "./routes/user.mjs";
import applications from "./routes/applications.mjs";
import login from "./routes/login.mjs";

// Starting from Express 4.16.0, body-parser has been re-added under the methods express.json() and express.urlencoded()
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());

// Increase limit for JSON payload
app.use(express.json({ limit: '50mb' }));

// Increase limit for URL-encoded payload
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use("/record", records);
app.use("/user", users);
app.use("/application", applications);
app.use("/login", login);

app.get("/", async (req, res) => {
    res.status(200).send("Hello World");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});