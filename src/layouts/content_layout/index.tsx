import { Box } from '@material-ui/core';
import { t } from 'i18n-js';
import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { NotFound } from '../../components/not_found';
import { ROUTES } from '../../config/route-config';
import { Account } from '../../pages/account';
import { Home } from '../../pages/home';

/**
 * The main layout for the app
 */
export const ContentLayout: FC = () => {
  return (
    <>
      <Box component="main">
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route path={ROUTES.ACCOUNT}>
            <Account />
          </Route>
          <Route path="*">
            <NotFound mainTitle={t('layouts.ContentLayout.NotFound.mainTitle')} />
          </Route>
        </Switch>
      </Box>
    </>
  );
};
