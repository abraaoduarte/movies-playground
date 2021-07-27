import LoginTemplate from '../templates/Login'
import Head from 'next/head'

export default function Login() {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>
        <LoginTemplate />
      </>
    )
  }
