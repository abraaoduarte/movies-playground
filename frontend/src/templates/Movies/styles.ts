import styled from 'styled-components';

export const Container = styled.div`
    background-color: #56b084;
    min-height: 100vh;
    padding: 30px 0;
    width: 100%;
`

export const SearchContainer = styled.div`
    position: relative;
    width: 50%;
    max-width: 968px;
    margin: 0 auto;
    text-align: center;
    h1 {
        text-transform: uppercase;
        color: #333;
    }
    input {
        border: 1px solid #CCC;
        width: 80%;
        padding: 8px;
    }
    button {
        padding: 9px;
        border: none;
        text-transform: uppercase;
        cursor: pointer;
        &:hover {
            background-color: #CCC;
        }
    }
`

export const ContainerCard = styled.div`
    position: relative;
    width: 100%;
    max-width: 968px;
    margin: 30px auto;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(4, 1fr);
`
export const WrapperCard = styled.div`
    .avatar {
        width: 100%;
    }
`