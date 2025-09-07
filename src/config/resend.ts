import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@bookingstars.pro';

export const isEmailEnabled = Boolean(RESEND_API_KEY);
