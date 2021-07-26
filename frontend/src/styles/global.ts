import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
	body {
		overflow-anchor: none;
	}
	${({ theme }) => css`
		body,
		html {
			font-size: 100%;
		}
	`}
`;
