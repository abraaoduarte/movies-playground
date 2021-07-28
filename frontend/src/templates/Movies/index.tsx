import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Loading } from 'components';
import Pagination from '@material-ui/lab/Pagination';
import * as S from './styles';
import BaseTemplate from '../Base';
import client from '../../services/client-axios';

type Movie = {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
};

type PaginationProps = {
	total: number;
	currentPage: number;
};

const Movies: React.FC = () => {
	const router = useRouter();

	const [token, setToken] = useState('');
	const [search, setSearch] = useState('');
	const [movies, setMovies] = useState<Movie[]>();
	const [loading, setLoading] = useState(false);
	const [bookmarkeds, setBookmarked] = useState<string[]>([]);
	const [pagination, setPagination] = useState<PaginationProps>({
		total: 0,
		currentPage: 1,
	});

	useEffect(() => {
		const getToken = localStorage.getItem('token');
		if (!getToken) {
			router.push('/login');
			return;
		}
		setToken(getToken);
	});

	const onSearch = async () => {
		try {
			setLoading(true);
			const { data } = await client.get(`http://localhost:3001/api/v1/movies/search?title=${search}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTimeout(() => {
				setPagination({
					total: data.result.total,
					currentPage: 1,
				});
				setMovies(data.result.movies);
				setLoading(false);
			}, 700);
		} catch (error) {
			setTimeout(() => setLoading(false), 1000);
		}
	};

	const handlePagination = async (event: React.ChangeEvent<unknown>, value: number) => {
		try {
			setLoading(true);
			const { data } = await client.get(`http://localhost:3001/api/v1/movies/search?title=${search}&page=${value}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTimeout(() => {
				setPagination({
					total: data.result.total,
					currentPage: value,
				});
				setMovies(data.result.movies);
				setLoading(false);
			}, 1000);
		} catch (error) {
			setTimeout(() => setLoading(false), 1000);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value);

	const handleBookmarked = async (movieId: string) => {
		try {
			setLoading(true);
			await client.post(
				`http://localhost:3001/api/v1/movies/bookmarked`,
				{
					movieId,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (bookmarkeds.includes(movieId)) {
				setBookmarked(bookmarkeds.filter((movie) => movie !== movieId));
				setTimeout(() => setLoading(false), 1000);
				return;
			}
			setBookmarked([...bookmarkeds, movieId]);
			setTimeout(() => setLoading(false), 1000);
		} catch (error) {
			setTimeout(() => setLoading(false), 1000);
		}
	};

	if (loading) {
		return (
			<BaseTemplate title="Login">
				<Loading />
			</BaseTemplate>
		);
	}

	return (
		<BaseTemplate title="Movies">
			<S.SearchContainer>
				<h1>Movies!</h1>
				<input type="text" onChange={handleChange} value={search} />
				<button type="button" onClick={onSearch}>
					Buscar
				</button>
			</S.SearchContainer>
			<S.ContainerCard>
				{movies?.map((movie) => (
					<S.WrapperCard key={movie.imdbID}>
						<Card {...movie} bookmarked={bookmarkeds.includes(movie.imdbID)} onBookmarked={handleBookmarked} />
					</S.WrapperCard>
				))}
			</S.ContainerCard>
			{pagination.total > 10 && (
				<S.WrapperPagination>
					<Pagination
						count={Math.ceil(pagination.total / 10)}
						page={pagination.currentPage}
						onChange={handlePagination}
						variant="outlined"
					/>
				</S.WrapperPagination>
			)}
		</BaseTemplate>
	);
};

export default Movies;
