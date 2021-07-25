import { Request } from 'express';
import * as userRepository from '../../../../domains/user/user-repository';
import { wrap } from '../../../../utils/wrap';

export const register = wrap((request: Request) =>
	userRepository.register(request.body).then((user) => ({
		body: {
			message: 'success',
			result: user,
		},
	}))
);
