import express from "express";
import cors from "cors";
import records from "./routes/record.mjs"
import users from "./routes/user.mjs"
import applications from "./routes/applications.mjs"
import login from "./routes/login.mjs"


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors())
app.use(express.json());

app.use("/record",records)
app.use("/user",users)
app.use("/application",applications)
app.use("/login",login)


app.get("/",async (req, res)=>{
    res.send("Hello World").status(200);
})

//start the server
app.listen(PORT,() =>{
    console.log(`Server is running on port :http://localhost:${PORT}`);
})