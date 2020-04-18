import React from 'react';

import { ThemeProvider } from 'styled-components';

import { CssReset } from 'dreampact';

import GlobalStyle from './components/GlobalStyle';

import useTheme from './hooks/useTheme';

import Routes from './Routes';

function App() {
  const [theme] = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <CssReset />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
