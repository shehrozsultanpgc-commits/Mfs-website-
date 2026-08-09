import { Request, Response, NextFunction } from 'express';

/**
 * MFS Growth Agency — Enterprise Input Sanitization & Validation Engine
 */

/**
 * Strip dangerous HTML tags, scripts, event attributes, and protocols from text
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  let clean = input.trim();

  // Strip script tags & their contents
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Strip dangerous inline event handlers like onload=, onerror=, onclick=
  clean = clean.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  clean = clean.replace(/on\w+\s*=\s*[^>\s]+/gi, '');

  // Strip javascript: and data: URIs in links
  clean = clean.replace(/javascript\s*:/gi, 'javascript_disabled:');
  clean = clean.replace(/data\s*:\s*text\/html/gi, 'data_disabled:');

  // Strip basic dangerous HTML tag delimiters for unformatted fields
  clean = clean.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return clean;
}

/**
 * Validate and sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';
  const cleaned = email.trim().toLowerCase();
  // Basic RFC 5322 regex validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleaned) ? cleaned : '';
}

/**
 * Validate phone number format
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  // Keep digits, +, -, spaces, and parentheses
  return phone.replace(/[^\d+()\s-]/g, '').trim().slice(0, 30);
}

/**
 * Recursively sanitize all string properties of an object or array
 */
export function sanitizeData<T>(data: T): T {
  if (data === null || data === undefined) return data;

  if (typeof data === 'string') {
    return sanitizeString(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item)) as unknown as T;
  }

  if (typeof data === 'object' && data.constructor === Object) {
    const sanitizedObj: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      const cleanKey = sanitizeString(key);
      sanitizedObj[cleanKey] = sanitizeData((data as Record<string, any>)[key]);
    }
    return sanitizedObj as T;
  }

  return data;
}

/**
 * Express Middleware to sanitize request body, query, and params
 */
export function sanitizeRequestMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeData(req.body);
  }
  if (req.query) {
    req.query = sanitizeData(req.query);
  }
  if (req.params) {
    req.params = sanitizeData(req.params);
  }
  next();
}
