import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as S from './styles';

const Loading: React.FC = () => {
	return (
		<S.Wrapper>
			<CircularProgress />
		</S.Wrapper>
	);
};

export default Loading;
