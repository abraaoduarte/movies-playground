import * as S from './styles'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router'

const Login: React.FC = () => {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const handleLogin = async () => {
        try {
            setLoading(true)

            const { data } = await axios.post('http://localhost:3001/api/v1/auth/login', {
                email,
                password,
            })

            localStorage.setItem('user', JSON.stringify(data.result.user));
            localStorage.setItem('token', data.result.token);
            router.push('/movies')

        } catch (error) {
            setLoading(false)
        }
    }
    if (loading) {
        return <CircularProgress />
    }
    return (
        <S.Container>
            <S.FormContainer>
                <h3>Welcome!</h3>
                <h4>Movies repository</h4>
                <form>
                    <S.Input type="email" onChange={handleChangeEmail} value={email} />
                    <S.Input type="password" onChange={handleChangePassword} value={password} />
                    <S.Button type="button" onClick={handleLogin}>Login</S.Button>
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </form>
            </S.FormContainer>
        </S.Container>
    )
}

export default Login;