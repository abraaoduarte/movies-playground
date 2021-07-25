import { Model, model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
	email: string;
	name: string;
	password: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: [true, 'Email required'],
		trim: true,
	},
	name: {
		type: String,
		required: [true, 'Name required'],
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Password required'],
	},
	isActive: {
		type: Boolean,
		default: 1,
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

export const User: Model<IUser> = model('User', UserSchema);
