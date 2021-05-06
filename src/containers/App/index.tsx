import React from 'react';
import { ThemeProvider } from 'styled-components';
import moment from 'moment';
import renderRoutes from '../../router';
import { routes } from '../../router/routes';
import HeaderMenu from '../Header/HeaderMenu';
import './App.css';
import GlobalStyle, { theme } from './GlobalStyle';
import { AppStyled, Content } from './styles';

moment.locale('zh-cn');

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <AppStyled>
        <GlobalStyle />
        <HeaderMenu />
        <Content>{renderRoutes(routes)}</Content>
      </AppStyled>
    </ThemeProvider>
  );
}

export default App;
