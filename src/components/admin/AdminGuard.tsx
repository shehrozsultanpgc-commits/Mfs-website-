import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, Lock } from 'lucide-react';
import { useAdminInactivity } from '../../hooks/useAdminInactivity';
import { AdminLogin } from '../../pages/admin/AdminLogin';

interface AdminGuardProps {
  children: React.ReactNode;
  onShowToast?: (msg: string) => void;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children, onShowToast }) => {
  const { isManager, isSuperAdmin, isLoading, signOut } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const pinVerified = sessionStorage.getItem('adminPinVerified');
    if (pinVerified === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleTimeout = () => {
    sessionStorage.removeItem('adminPinVerified');
    setIsAuthenticated(false);
    // Optionally call signOut() if you want to fully log out of Supabase too
    if (onShowToast) {
      onShowToast("Session expired due to inactivity");
    }
  };

  useAdminInactivity(handleTimeout);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#050507]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#E5C158] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#CFCFCF] text-sm">Verifying Secure Admin Session...</p>
        </div>
      </div>
    );
  }

  // If not logged in as admin via Supabase, show access denied
  if (!isManager && !isSuperAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#050507]">
        <div className="max-w-md w-full bg-[#120D0D] border border-red-900/40 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-sm text-[#CFCFCF]">
            This section requires Executive Admin or Operational Manager authorization privileges.
          </p>
        </div>
      </div>
    );
  }

  // If valid Supabase admin but PIN not yet entered
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <>{children}</>;
};
