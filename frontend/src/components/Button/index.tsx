import React, { ButtonHTMLAttributes } from 'react'
import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { text } = props;
    return (
        <S.Button {...props}>{text}</S.Button>
    )
}

export default Button;