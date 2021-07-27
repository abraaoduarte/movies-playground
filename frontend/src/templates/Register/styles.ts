import styled from 'styled-components';

export const Container = styled.div`
    background-color: #56b084;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
`

export const FormContainer = styled.div`
    width: 30%;
    padding: 20px;
    background-color: #FFF;
    margin: 0 auto;
    box-shadow: 11px 2px 12px -4px #000000;
    h3, h4 {
        text-transform: uppercase;
        color: #333;
    }
    h4 {
        margin: 8px 0;
    }
    a {
        color: #333;
        margin: 8px 0;
        position: relative;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`