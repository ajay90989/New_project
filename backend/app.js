"use strict";

require("dotenv").config();
const mongoConnection = require("./App/Connection/Connection");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");



const server = http.createServer(app);

const corsOpts = {
    origin: ["http://localhost:3000", "*"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
};


app.use(cors(corsOpts));
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "10mb", extended: true }));




app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.json({ error: "Internal Server Error" });
});

require("./App/routes")(app);

app.use((req, res) => {
    res.send("Not Found");
});


mongoConnection();


server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
});