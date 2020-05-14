import { t } from 'i18n-js';
import { useLocation } from 'react-router';
import { MenuNavigationProps } from '../../components/menu_navigation';
import { UserMenuProps } from '../../components/user_menu';
import { ROUTES } from '../../config/route-config';
import { useGetSettingsHeaderMenu } from './settings_header_menu/hooks';
import { useGetUserHeaderMenu } from './user_menu/hooks';

/**
 * Get the header menu
 *
 * @returns an array with in order:
 *      - the header title for the content page
 *      - the menu for the user
 *      - the menu to display, empty array if no menu
 */
export const useGetHeaderMenu = (): [string, UserMenuProps, MenuNavigationProps] => {
  const location = useLocation();
  const [userMenuProps] = useGetUserHeaderMenu();
  const settingsHeaderMenu = useGetSettingsHeaderMenu();

  const getHeaderTitle = (): string => {
    if (location.pathname.includes(ROUTES.DASHBOARD_SALES) || location.pathname.includes(ROUTES.DASHBOARD_ANALYTICS)) {
      return t('layouts.HeaderLayout.useGetHeaderMenu.getHeaderTitle.dashboard');
    }
    if (location.pathname.includes(ROUTES.SETTINGS_USER_ACTIVE) || location.pathname.includes(ROUTES.SETTINGS_USER_DISABLED)) {
      return t('layouts.HeaderLayout.useGetHeaderMenu.getHeaderTitle.users');
    }
    return '';
  };

  const subMenu = (): MenuNavigationProps => {
    if (location.pathname.includes(ROUTES.SETTINGS_USER_ACTIVE) || location.pathname.includes(ROUTES.SETTINGS_USER_DISABLED)) {
      return settingsHeaderMenu;
    }
    return { activeIndex: -1, subMenu: [] };
  };

  return [getHeaderTitle(), userMenuProps, subMenu()];
};
