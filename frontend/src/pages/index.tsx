import Head from 'next/head';
import MoviesTemplate from '../templates/Movies';

export default function Index() {
	return (
		<>
			<Head>
				<title>Movies</title>
			</Head>
			<MoviesTemplate />
		</>
	);
}
