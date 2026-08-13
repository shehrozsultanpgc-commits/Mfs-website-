import React from 'react';
import { AdminDashboard as EnterpriseAdminDashboard } from '../../components/AdminDashboard';
import { Currency } from '../../types';

interface AdminDashboardProps {
  currency: Currency;
  setCurrency?: (c: Currency) => void;
  onShowToast: (msg: string) => void;
  onNavigatePage: (page: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currency,
  setCurrency,
  onShowToast,
  onNavigatePage,
}) => {
  return (
    <EnterpriseAdminDashboard
      currency={currency}
      setCurrency={setCurrency || (() => {})}
      onShowToast={onShowToast}
      onNavigatePage={onNavigatePage}
    />
  );
};

