import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import theme from './styles/theme';
import Home from './views/Home';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
