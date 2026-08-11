import { supabase } from './supabase';
import type { AuditSeverity } from './database.types';

export interface AuditLogEntry {
  id: string;
  eventType: string;
  severity: AuditSeverity;
  actorId?: string | null;
  actorEmail?: string | null;
  description: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

const LOCAL_AUDIT_LOGS_KEY = 'mfs_noc_audit_logs';

/**
 * Log an audit event to Supabase NOC Audit Logs table with fallback to local cache
 */
export async function logAuditEvent(params: {
  eventType: string;
  severity?: AuditSeverity;
  actorId?: string;
  actorEmail?: string;
  description: string;
  metadata?: Record<string, any>;
}): Promise<AuditLogEntry> {
  const {
    eventType,
    severity = 'info',
    actorId = null,
    actorEmail = 'system@mfsgrowth.com',
    description,
    metadata = {},
  } = params;

  const newLog: AuditLogEntry = {
    id: 'log-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now(),
    eventType,
    severity,
    actorId,
    actorEmail,
    description,
    metadata,
    timestamp: new Date().toISOString(),
  };

  // 1. Cache locally for instant UI update
  try {
    const existingRaw = localStorage.getItem(LOCAL_AUDIT_LOGS_KEY);
    const existingLogs: AuditLogEntry[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [newLog, ...existingLogs].slice(0, 100);
    localStorage.setItem(LOCAL_AUDIT_LOGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[MFS Audit Logger] Local cache write warning:', err);
  }

  // 2. Persist to Supabase DB
  try {
    await (supabase.from('noc_audit_logs') as any).insert({
      event_type: eventType,
      severity,
      actor_id: actorId,
      actor_email: actorEmail,
      description,
      metadata,
      timestamp: newLog.timestamp,
    });
  } catch (err) {
    console.warn('[MFS Audit Logger] Supabase insert log warning:', err);
  }

  return newLog;
}

/**
 * Fetch recent audit logs from Supabase or local fallback
 */
export async function fetchAuditLogs(limit = 50): Promise<AuditLogEntry[]> {
  try {
    const { data, error } = await (supabase
      .from('noc_audit_logs') as any)
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (data && !error && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        eventType: row.event_type,
        severity: row.severity as AuditSeverity,
        actorId: row.actor_id,
        actorEmail: row.actor_email,
        description: row.description,
        metadata: (row.metadata as Record<string, any>) || {},
        timestamp: row.timestamp,
      }));
    }
  } catch (err) {
    console.warn('[MFS Audit Logger] Supabase fetch audit logs exception:', err);
  }

  // Fallback to local cached logs
  try {
    const existingRaw = localStorage.getItem(LOCAL_AUDIT_LOGS_KEY);
    if (existingRaw) {
      return JSON.parse(existingRaw);
    }
  } catch (err) {
    console.warn('[MFS Audit Logger] Local cache read warning:', err);
  }

  // Default seed audit logs if empty
  return [
    {
      id: 'log-seed-1',
      eventType: 'SYSTEM_BOOT',
      severity: 'info',
      actorEmail: 'admin@mfsgrowth.com',
      description: 'NOC Operations Center Security & Realtime Subscriptions Initialized.',
      metadata: { environment: 'production', release: 'Phase 14' },
      timestamp: new Date().toISOString(),
    },
    {
      id: 'log-seed-2',
      eventType: 'AUTH_VERIFY',
      severity: 'info',
      actorEmail: 'admin@mfsgrowth.com',
      description: 'Super Admin RBAC session authenticated with MFA Security PIN.',
      metadata: { role: 'super_admin' },
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
}
