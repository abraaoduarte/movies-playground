import { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';
import { findUserByUuid } from '../../domains/user/user-repository';
import { composeMiddleware } from '../../utils/compose-middleware';
import logger from '../../utils/logger';
import { Unauthorized } from '../error';

type CustomRequest = Request & {
	payload: {
		data: {
			user: string;
		};
		iat: number;
		exp: number;
	};
};

const getUser = () => (request: CustomRequest, _: Response, next: NextFunction) => {
	if (!request.payload) {
		return next();
	}

	return findUserByUuid(request.payload.data.user)
		.then(() => next())
		.catch((error) => {
			logger.error(error);
			return next(new Unauthorized('Usuário autenticado não existe'));
		});
};

const verifyJwt = () =>
	jwt({
		secret: '1234',
		credentialsRequired: true,
		userProperty: 'payload',
		algorithms: ['HS256'],
		getToken: function fromHeaderOrQuerystring(request: Request) {
			if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
				return request.headers.authorization.split(' ')[1];
			}

			if (request.query && request.query.token) {
				return request.query.token;
			}

			return null;
		},
	});

const auth = () => composeMiddleware([verifyJwt(), getUser()]);

export { auth };
