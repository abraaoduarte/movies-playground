import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as S from './styles'

type BaseProps = {
  title: string;
}

const Base: React.FC<BaseProps> = ({ children, title = 'Movies Playground' }) => {
    return (
      <S.Wrapper>
        <AppBar className="header">
          <Toolbar>
            <Typography variant="h6">{title}</Typography>
          </Toolbar>
        </AppBar>
        <S.Content>
          {children}
        </S.Content>
      </S.Wrapper>
    )
}

export default Base;