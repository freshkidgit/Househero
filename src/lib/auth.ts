import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET_KEY || 'househero-admin-2026';
const SESSION_SECRET = process.env.SESSION_SECRET || 'househero-secret-salt-981273';

export function hashPassword(pwd: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(pwd).digest('hex');
}

export function validateAdminPassword(pwd: string): boolean {
  if (!pwd) return false;
  return pwd.trim() === ADMIN_PASSWORD.trim();
}

export function createAdminSessionToken(): string {
  const payload = `hh_admin_${Date.now()}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return signature === expected;
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('hh_admin_session')?.value;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}
