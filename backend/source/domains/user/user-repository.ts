import bcrypt from 'bcrypt';
import { User, IUser } from './user.schema';
import { BadRequest } from '../../app/error';

const isEmailBeingUsed = async (email: string): Promise<IUser> => {
	const user = await User.findOne({ email });

	return user;
};

const hashPassword = (password: string) => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(Number(saltRounds));
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

const validationEmail = (email: string): boolean => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regex.test(email);
};

export const register = async (body: IUser): Promise<IUser | null> => {
	if (!body) {
		throw new BadRequest('Email, name and password is required');
	}

	if (!body.email) {
		throw new BadRequest('Email is required');
	}

	if (!validationEmail(body.email)) {
		throw new BadRequest('Email is invalid');
	}

	const isEmailDuplicated = await isEmailBeingUsed(body.email);

	if (isEmailDuplicated) {
		throw new BadRequest('This email is being used');
	}

	const user = await User.create({ ...body, password: hashPassword(body.password) });

	return user;
};
