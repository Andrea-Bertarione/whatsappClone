import { MongoClient } from "mongodb";

const connectionString = process.env.DBURL || "";

const client = new MongoClient(connectionString);

const conn = await client.connect();
const db = conn.db("WACloneDev");

export default db;
