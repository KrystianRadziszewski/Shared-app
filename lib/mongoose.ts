import mongoose from 'mongoose';

// check connected to DB
let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) {
		console.log('MONGODB_URL not found');
		return;
	}

	if (isConnected) {
		console.log('Already connected to MongoDB');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL);

		isConnected = true;

		console.log('Connected to MongoDB');
	} catch (error) {
		console.log('Some went wrong: ', error);
	}
};
