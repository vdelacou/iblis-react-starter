import i18n from 'i18n-js';
import React, { FC, MouseEvent, ReactNode, SyntheticEvent } from 'react';
import { Route, Switch } from 'react-router';
import { ErrorSnackbar } from '../../components/error_snackbar';
import { ROUTES } from '../../config/route-config';
import en from '../../i18n/en.json';
import { MainLayout } from '../../layouts/main_layout';
import { Login } from '../../pages/login';
import { useErrorMessageStore } from '../../stores/error_message_store';

export const AppInitializer: FC = () => {
  // global error management
  const { getErrorMessage, setErrorMessage } = useErrorMessageStore();

  // manage the error snackbar when user want to close it
  const handleCloseError = (_event: SyntheticEvent | MouseEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    // we don't display the error message anymore
    setErrorMessage(null);
  };

  // init the internationalization
  i18n.fallbacks = true;
  i18n.translations = { en };

  // here we can redirect if the user is not connected for example
  const redirectRoute = (): ReactNode => {
    return <MainLayout />;
  };

  return (
    <span data-testid="testId">
      <>
        {/* All the routes */}
        <Switch>
          {/* login */}
          <Route exact path={ROUTES.LOGIN}>
            <Login />
          </Route>
          {/* The routes inside the main layout */}
          <Route>{redirectRoute()}</Route>
        </Switch>
      </>
      {/* All the global components */}
      <>
        {/* show the error */}
        <ErrorSnackbar errorMessage={getErrorMessage()} handleClose={handleCloseError} />
      </>
    </span>
  );
};
