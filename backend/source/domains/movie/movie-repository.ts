import { CustomRequest } from '../../types/CustomRequest';
import omdbapi from '../../app/service/omdbapi-client';
import { MovieBookmarked } from './movie.schema';
import { BadRequest } from '../../app/error';

export const search = async (query) => {
	const { data } = await omdbapi.get(`/?apikey=d9f4d88c&s=${query.title}&page=${query.page || 1}`);
	const movies = {
		...data,
	};

	return {
		movies: movies.Search,
		total: movies.totalResults,
	};
};

const getBookmarked = async (userId: string, movieId: string) => {
	const findBookmarked = await MovieBookmarked.findOne({ userId, movieId });

	return findBookmarked;
};

export const bookmarked = async (request: CustomRequest) => {
	const payload = {
		userId: request.payload.data.user,
		movieId: request.body.movieId,
	};

	const { data } = await omdbapi.get(`/?apikey=d9f4d88c&i=${request.body.movieId}`);

	if (data.Response === 'False') {
		throw new BadRequest('Movie not exists');
	}

	const bookmarkedExists = await getBookmarked(payload.userId, payload.movieId);
	if (bookmarkedExists) {
		// eslint-disable-next-line no-underscore-dangle
		await MovieBookmarked.deleteOne({ _id: bookmarkedExists._id });

		return bookmarkedExists;
	}

	const movieBookmarked = await MovieBookmarked.create({ ...payload });

	return movieBookmarked;
};

export const list = async (request: CustomRequest) => {
	const movies = await MovieBookmarked.find({ userId: request.payload.data.user });

	return movies;
};
