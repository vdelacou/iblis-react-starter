import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorMessageStoreProvider } from '../stores/error_message_store';
import { appTheme } from '../theme';
import { AppInitializer } from './app_initializer';

const App: FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <ErrorMessageStoreProvider>
          <AppInitializer />
        </ErrorMessageStoreProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
