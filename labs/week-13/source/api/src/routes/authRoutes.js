import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_LOGINS = 5;
const failedLogins = new Map();

export function resetLoginLimiter() {
  failedLogins.clear();
}

router.post('/login', (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const key = `${req.ip}:${email}`;
  const now = Date.now();
  for (const [savedKey, entry] of failedLogins) {
    if (now - entry.startedAt >= LOGIN_WINDOW_MS) failedLogins.delete(savedKey);
  }
  const entry = failedLogins.get(key);
  if (entry && entry.count >= MAX_FAILED_LOGINS) {
    res.set('Retry-After', String(Math.ceil((entry.startedAt + LOGIN_WINDOW_MS - now) / 1000)));
    return res.status(429).json({ error: 'เข้าสู่ระบบไม่สำเร็จหลายครั้ง กรุณาลองใหม่ภายหลัง' });
  }

  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    const current = failedLogins.get(key);
    if (current) current.count += 1;
    else {
      if (failedLogins.size >= 10000) failedLogins.delete(failedLogins.keys().next().value);
      failedLogins.set(key, { count: 1, startedAt: now });
    }
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  res.status(200).json(result);
});

export default router;
