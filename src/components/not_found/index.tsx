import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';

/*
 * The Not Found Component
 */
export const NotFound: FC<NotFoundProps> = props => {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center" flexDirection="row">
      <Typography variant="h1">{props.mainTitle}</Typography>
    </Box>
  );
};

export interface NotFoundProps {
  /**
   * The main title
   */
  mainTitle: string;
}
