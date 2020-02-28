import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React, { FC } from 'react';

/*
 * The Header Component
 */
export const Header: FC<HeaderProps> = props => {
  return (
    <AppBar color="inherit">
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          {props.headerTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export interface HeaderProps {
  /**
   * The main title
   */
  headerTitle: string;
}
