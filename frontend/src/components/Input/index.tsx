import React, { InputHTMLAttributes } from 'react'
import * as S from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
    error?: string;
    label: string;
}

const Input: React.FC<InputProps> = (props) => {
    const { hasError = false, label, error = '' } = props;
    return (
        <S.Wrapper>
            <S.Label error={hasError}>{label}</S.Label>
            <S.Input {...props} error={hasError} />
            <S.Label error={hasError}>{error}</S.Label>
        </S.Wrapper>
    )
}

export default Input;