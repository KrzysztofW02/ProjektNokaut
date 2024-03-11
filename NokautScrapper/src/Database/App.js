import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb+srv://Rafal:Nokaut@nokaut.mxtx026.mongodb.net/?retryWrites=true&w=majority&appName=Nokaut';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

export async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    const insertResult = await collection.insertOne({ a: 1 });
    console.log('Inserted documents =>', insertResult);

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());