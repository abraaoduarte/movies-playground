import Head from 'next/head';
import LoginTemplate from '../templates/Login';

export default function Login() {
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<LoginTemplate />
		</>
	);
}
