import { Box } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';

/*
 * The Dashboard Layout with Header and Content
 */
export const DashboardLayout: FC<DashboardLayoutProps> = props => {
  return (
    <Box display="flex">
      <Box component="header">{props.headerComponent}</Box>
      <Box display="flex" flexDirection="column" width="100vw">
        <Box>{props.contentComponent}</Box>
      </Box>
    </Box>
  );
};

export interface DashboardLayoutProps {
  /**
   * The header component
   */
  headerComponent: ReactNode;
  /**
   * The content component
   */
  contentComponent: ReactNode;
}
