import omdbapi from '../../app/service/omdbapi-client';

export const search = async (query) => {
	const { data } = await omdbapi.get(`/?apikey=d9f4d88c&s=${query.title}`);
	const movies = {
		...data,
	};

	return {
		movies: movies.Search,
		total: movies.totalResults,
	};
};
