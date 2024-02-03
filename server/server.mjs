import express from "express";
import cors from "cors";
import records from "./routes/record.mjs";
import users from "./routes/user.mjs";
import applications from "./routes/applications.mjs";
import login from "./routes/login.mjs";
import announcements from "./routes/announcements.mjs";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Default CORS options for the entire app
const defaultCorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(defaultCorsOptions)); // Apply default CORS policy globally
app.use(cookieParser());

// Increase limit for JSON and URL-encoded payload
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Custom CORS options for the login route
const loginCorsOptions = {
  origin: 'http://localhost:3000', // Customize as needed
  credentials: true,
  methods: ['GET', 'POST'], // Example of further customization
};




// Applying CORS with custom options to the login route specifically
app.use("/login", cors(loginCorsOptions), login);

// Apply the rest of the routers without specific CORS
app.use("/record", records);
app.use("/user", users);
app.use("/application", applications);
app.use("/announcements", announcements);

app.get("/", async (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
