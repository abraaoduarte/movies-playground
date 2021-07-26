import { Request } from 'express';

export type CustomRequest = Request & {
	payload: {
		data: {
			user: string;
		};
	};
};
