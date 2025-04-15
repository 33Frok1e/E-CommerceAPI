import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
    await mongoose.connect(config.db_url as string);

    app.listen(config.port, () => {
        console.log(`Server is running on ${config.port}`);
    })
}

main().then(() => console.log('MongoDB is connected')).catch((e) => console.log(`Error is ${e}`));

// For serverless function 
// import mongoose from 'mongoose';
// import app from './app';
// import config from './app/config';

// let isConnected = false;

// export async function connectDB() {
//     if (isConnected) return;

//     try {
//         await mongoose.connect(config.db_url as string);
//         isConnected = true;
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('DB Connection Error:', err);
//         throw err;
//     }
// }

// export default app;
