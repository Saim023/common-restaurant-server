const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

const port = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@practice.p9kdwmi.mongodb.net/?appName=Practice`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

async function run() {
	try {
		await client.connect();

		const menuCollection = client.db("common-restuarant").collection("menu");
		const reviewsCollection = client.db("common-restuarant").collection("reviews");

		// Menu
		app.get("/menu", async (req, res) => {
			const result = await menuCollection.find().toArray();
			res.send(result);
		});

		// Items
		app.get("/items", async (req, res) => {
			const result = await menuCollection.find().toArray();
			res.send(result);
		});

		// Reviews
		app.get("/reviews", async (req, res) => {
			const result = await reviewsCollection.find().toArray();
			res.send(result);
		});

		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Common Restuarant server running...");
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
