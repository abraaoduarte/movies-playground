import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { isEmpty, isNil, omit } from 'ramda';
import bcrypt from 'bcrypt';
import { findByEmail, findUserByUuid } from '../user/user-repository';
import { Unauthorized } from '../../app/error';

const TOKEN_DURATION = '4h';

export const makeToken = (id: string) => jwt.sign({ data: { user: id } }, '1234', { expiresIn: TOKEN_DURATION });

export const compare = (password: string, hash: string) => bcrypt.compare(password, hash);

export const login = async ({ body }: Request) => {
	const { email, password } = body;
	const user = await findByEmail(email);

	if (isNil(user) || isEmpty(user)) {
		throw new Unauthorized('Incorrect email and/or password. Please check the data and try again.');
	}

	const isValid = await compare(password, user.password);

	if (!isValid) {
		throw new Unauthorized('Incorrect email and/or password. Please check the data and try again.');
	}
	return {
		user: omit(['password', '__v'], user.toObject()),
		// eslint-disable-next-line no-param-reassign, no-underscore-dangle
		token: makeToken(user._id),
		duration: TOKEN_DURATION,
	};
};

export const refresh = async ({ body }: Request) => {
	const { id } = body;

	const user = await findUserByUuid(id);

	if (isNil(user) || isEmpty(user)) {
		throw new Unauthorized('Cannot update token as user no longer exists.');
	}

	return {
		user,
		token: makeToken(id),
		duration: TOKEN_DURATION,
	};
};
