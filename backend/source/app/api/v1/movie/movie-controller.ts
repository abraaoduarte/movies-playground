import { Request } from 'express';
import { CustomRequest } from '../../../../types/CustomRequest';
import * as movieRepository from '../../../../domains/movie/movie-repository';
import { wrap } from '../../../../utils/wrap';

export const search = wrap((request: Request) =>
	movieRepository.search(request.query).then((movie) => ({
		body: {
			message: 'success',
			result: movie,
		},
	}))
);

export const bookmarked = wrap((request: CustomRequest) =>
	movieRepository.bookmarked(request).then(() => ({
		body: {
			message: 'success',
		},
	}))
);
