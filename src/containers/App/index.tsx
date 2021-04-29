import React from 'react';
import { ThemeProvider } from 'styled-components';
import moment from 'moment';
import AppRouter from '../../router';
import './App.css';
import HeaderMenu from '../Header/HeaderMenu';
import GlobalStyle, { theme } from './GlobalStyle';
import { AppStyled, Content } from './styles';

moment.locale('zh-cn');

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <AppStyled>
        <GlobalStyle />
        <HeaderMenu />
        <Content>
          <AppRouter />
        </Content>
      </AppStyled>
    </ThemeProvider>
  );
}

export default App;
