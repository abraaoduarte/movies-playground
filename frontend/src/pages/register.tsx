import RegisterTemplate from '../templates/Register'
import Head from 'next/head'

export default function Register() {
    return (
      <>
        <Head>
          <title>Register</title>
        </Head>
        <RegisterTemplate />
      </>
    )
  }
