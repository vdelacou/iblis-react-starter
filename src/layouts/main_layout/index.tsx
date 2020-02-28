import { t } from 'i18n-js';
import React, { FC } from 'react';
import { DashboardLayout } from '../../components/dashboard_layout';
import { Header } from '../../components/header';
import { ContentLayout } from '../content_layout';

/**
 * The main layout for the app
 */
export const MainLayout: FC = () => {
  return <DashboardLayout headerComponent={<Header headerTitle={t('layouts.MainLayout.DashboardLayout.headerComponent.headerTitle')} />} contentComponent={<ContentLayout />} />;
};
