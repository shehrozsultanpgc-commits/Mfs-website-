import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

interface GuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RequireAuth: React.FC<GuardProps> = ({ children, fallback }) => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-[#050507]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#E5C158] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#CFCFCF] text-sm">Verifying MFS Security Credentials...</p>
        </div>
      </div>
    );
  }

  if (!user && !profile) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-[#050507]">
        <div className="max-w-md w-full bg-[#0F0F12] border border-[#2A2B35] rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-[#E5C158]/10 border border-[#E5C158]/30 rounded-full flex items-center justify-center mx-auto text-[#E5C158]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-sm text-[#CFCFCF]">
            Please sign in to access your MFS Growth Agency client workspace or admin portal.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const RequireAdmin: React.FC<GuardProps> = ({ children, fallback }) => {
  const { isManager, isSuperAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-[#050507]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#E5C158] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#CFCFCF] text-sm">Validating Command Center RBAC Permissions...</p>
        </div>
      </div>
    );
  }

  if (!isManager && !isSuperAdmin) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-[#050507]">
        <div className="max-w-md w-full bg-[#120D0D] border border-red-900/40 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Access Denied (RBAC Restricted)</h2>
          <p className="text-sm text-[#CFCFCF]">
            This section requires Executive Admin or Operational Manager authorization privileges.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const RequireClient: React.FC<GuardProps> = ({ children, fallback }) => {
  const { isClient, isSuperAdmin, isManager, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-[#050507]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#E5C158] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#CFCFCF] text-sm">Loading Client Workspace...</p>
        </div>
      </div>
    );
  }

  if (!isClient && !isSuperAdmin && !isManager) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-[#050507]">
        <div className="max-w-md w-full bg-[#0F0F12] border border-[#2A2B35] rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-[#E5C158]/10 border border-[#E5C158]/30 rounded-full flex items-center justify-center mx-auto text-[#E5C158]">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Client Portal Area</h2>
          <p className="text-sm text-[#CFCFCF]">
            Please log in with a client account to view active orders and deliverables.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
