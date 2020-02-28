import { Box, Typography } from '@material-ui/core';
import { t } from 'i18n-js';
import React, { FunctionComponent } from 'react';

export const Login: FunctionComponent = () => {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center" flexDirection="row">
      <Typography variant="h1">{t('pages.Login.mainTitle')}</Typography>
    </Box>
  );
};