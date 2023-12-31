import mongoose from 'mongoose';
import { date } from 'zod';

const threadSchema = new mongoose.Schema({
	text: { type: String, required: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	community: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Community',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	parentId: {
		type: String,
	},
	children: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Thread',
		},
	],
});

//check if existe User or no and then created
const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;
