import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	margin: 8px 0;
`;
const InputModifiers = {
	error: () => css`
		border: 1px solid #ff4444;
	`,
};

type InputError = {
	error: boolean;
};

export const Input = styled.input<InputError>`
	${({ error }) => css`
		width: 100%;
		margin: 8px 0;
		padding: 8px;
		color: #333;
		border: 1px solid #ccc;
		border-radius: 8px;
		color: #333;
		outline: none;
		${error && InputModifiers.error()}
	`}
`;
type LabelError = {
	error: boolean;
};

const LabelModifiers = {
	error: () => css`
		color: #ff4444;
		font-size: 12px;
	`,
};
export const Label = styled.label<LabelError>`
	${({ error }) => css`
		color: #333;
		${error && LabelModifiers.error()}
	`}
`;
