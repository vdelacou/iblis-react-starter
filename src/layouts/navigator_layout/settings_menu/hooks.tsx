import PeopleIcon from '@material-ui/icons/People';
import { t } from 'i18n-js';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { NavigatorMenuProps } from '../../../components/navigator';
import { ROUTES } from '../../../config/route-config';

/**
 * Get the menu for the settings in the navigator
 */
export const useGetSettingsMenu = (): NavigatorMenuProps => {
  const history = useHistory();
  const location = useLocation();

  const getActiveIndex = (): number => {
    if (location.pathname.includes(ROUTES.SETTINGS_USER_ACTIVE)) {
      return 0;
    }
    if (location.pathname.includes(ROUTES.SETTINGS_USER_DISABLED)) {
      return 0;
    }
    return -1;
  };

  return {
    categoryName: t('layouts.NavigatorLayout.getSettingsMenu.categoryName'),
    activeIndex: getActiveIndex(),
    menuList: [
      {
        name: t('layouts.NavigatorLayout.getSettingsMenu.menuList.users'),
        icon: <PeopleIcon />,
        action: (): void => history.push(ROUTES.SETTINGS_USER_ACTIVE),
      },
    ],
  };
};
