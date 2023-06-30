import mongoose, { ConnectionStates } from 'mongoose';

let isConnected: ConnectionStates | null = null;
const mongoDbURI: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zm37fip.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

async function dbConnection() {
    if (isConnected !== null) return;

    try {
        const db = await mongoose.connect(mongoDbURI);
        isConnected = db.connections[0].readyState;
        console.log('Database is connected.');
    } catch (error) {
        console.log('Database connect error!');
        console.log(error);
    }
}

export default dbConnection;
