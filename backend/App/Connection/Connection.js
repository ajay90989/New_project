const mongoose = require("mongoose");

async function connectToMongoDB() {
    if (!process.env.MONGO_URI || !process.env.DB_NAME) {
        console.error("Please set MONGO_URI and DB_NAME in .env");
        process.exit(1);
    }

    const db_connect = process.env.MONGO_URI;

    try {
        await mongoose.connect(db_connect, {
            dbName: process.env.DB_NAME,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }

    const connection = mongoose.connection;

    connection.on("error", (error) => {
        console.error("❌ MongoDB Connection Error:", error);
    });
}

module.exports = connectToMongoDB;
