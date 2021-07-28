import Head from 'next/head';
import RegisterTemplate from '../templates/Register';

export default function Register() {
	return (
		<>
			<Head>
				<title>Register</title>
			</Head>
			<RegisterTemplate />
		</>
	);
}
