const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

// Connection URL
const url = "mongodb+srv://Rafal:Nokaut@nokaut.mxtx026.mongodb.net/?retryWrites=true&w=majority&appName=Nokaut";
const client = new MongoClient(url);
var db;
var collection;
const dbName = "myProject";

async function saveToDatabase(products, productName) {
    // Use connect method to connect to the server
    const productDocument = {
        LastUpdate: new Date(),
        productName,
        products,
    };
    console.log("Saving to database")
    console.log(productDocument);

    await collection.insertOne(productDocument);

    return "done.";
}
async function initializeDBConnection() {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
    collection = db.collection("documents");
}

initializeDBConnection();

app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
    const productName = req.query.productName;
    let products = [];
    try {
        products = await collection.findOne({ productName: productName });
    } catch (e) {
        console.error(e);
    }
    res.json(products);
});

app.post("/api/products", (req, res) => {
    const receivedData = req.body;
    res.json({ message: "Data received" });
    saveToDatabase(receivedData.products, receivedData.productName);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
