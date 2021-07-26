import { Model, model, Schema, Document } from 'mongoose';

export interface IMovieBookmarked extends Document {
	userId: string;
	movieId: string;
	createdAt: Date;
	updatedAt: Date;
}

const MovieBookmarkedSchema = new Schema({
	userId: {
		type: String,
		required: [true, 'user required'],
		trim: true,
	},
	movieId: {
		type: String,
		required: [true, 'movie required'],
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export const MovieBookmarked: Model<IMovieBookmarked> = model('MovieBookmarked', MovieBookmarkedSchema);
