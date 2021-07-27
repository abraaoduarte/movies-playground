import * as S from './styles'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router'
import { Card } from 'components'

type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const Movies: React.FC = () => {
    const router = useRouter()

    const [token, setToken] = useState('');
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState<Movie[]>();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getToken = localStorage.getItem('token');
        if (getToken) {
            setToken(getToken);
            setLoading(false);
            return;
        }
        router.push('/login')
      });

    const onSearch = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:3001/api/v1/movies/search?title=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMovies(data.result.movies);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value)

    if (loading) {
        return <CircularProgress />
    }

    return (
        <S.Container>
            <S.SearchContainer>
                <h1>Movies!</h1>
                <input type="text" onChange={handleChange} value={search} />
                <button type="button" onClick={onSearch}>Buscar</button>
            </S.SearchContainer>
            <S.ContainerCard>
                {movies?.map((movie) => (
                    <S.WrapperCard key={movie.imdbID}>
                        <Card {...movie} />
                    </S.WrapperCard>
                ))}
            </S.ContainerCard>
        </S.Container>
    )
}

export default Movies;