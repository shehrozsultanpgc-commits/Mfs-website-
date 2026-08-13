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

  // If PIN not yet verified, render AdminLogin (the Decoy System Status page with secret PIN trapdoor)
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <>{children}</>;
};
