import styled from 'styled-components';

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
		border: 1px solid #ccc;
		width: 80%;
		padding: 8px;
	}
	button {
		padding: 9px;
		border: none;
		text-transform: uppercase;
		cursor: pointer;
		&:hover {
			background-color: #ccc;
		}
	}
`;

export const ContainerCard = styled.div`
	position: relative;
	width: 100%;
	max-width: 968px;
	margin: 30px auto;
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(4, 1fr);
`;

export const WrapperCard = styled.div`
	.avatar {
		width: 100%;
	}
`;

export const WrapperPagination = styled.div`
	width: 100%;
	margin: 16px 0;
	display: flex;
	justify-content: center;
`;
