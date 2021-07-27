import MoviesTemplate from '../templates/Movies'
import Head from 'next/head'

export default function Movies() {
    return (
      <>
        <Head>
          <title>Movies</title>
        </Head>
        <MoviesTemplate />
      </>
    )
  }
