import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { loadSeed } from '../../src/services/requestService.js';
import { resetLoginLimiter } from '../../src/routes/authRoutes.js';
import { STAFF, loginAsStaff, tokenFor } from '../helpers/auth.js';

/**
 * Week 13 — เข้าสู่ระบบและสิทธิ์
 * test 3 ข้อแรกให้มาแล้ว — จะ fail จนกว่าจะทำ CP50–CP51 เสร็จ (เขียน test ก่อน แล้วทำให้ผ่าน)
 */
const app = createApp();
beforeEach(async () => {
  await loadSeed();
  resetLoginLimiter();
});

describe('POST /api/auth/login', () => {
  test('อีเมลและรหัสผ่านถูก → 200 พร้อม token', async () => {
    const r = await request(app).post('/api/auth/login').send(STAFF);
    expect(r.status).toBe(200);
    expect(r.body.token.split('.')).toHaveLength(3);
  });
  test('รหัสผ่านผิด → 401', async () => {
    const r = await request(app).post('/api/auth/login').send({ ...STAFF, password: 'nope1234' });
    expect(r.status).toBe(401);
  });

  test('อีเมลที่ไม่มี → 401 พร้อมข้อความเดียวกับรหัสผ่านผิด', async () => {
    const wrongPassword = await request(app).post('/api/auth/login')
      .send({ ...STAFF, password: 'nope1234' });
    const unknownEmail = await request(app).post('/api/auth/login')
      .send({ email: 'unknown@rmutl.ac.th', password: 'nope1234' });
    expect(unknownEmail.status).toBe(401);
    expect(unknownEmail.body.error).toBe(wrongPassword.body.error);
  });
  test('รหัสผ่านผิดเกิน 5 ครั้ง → 429', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await request(app).post('/api/auth/login').send({ ...STAFF, password: 'wrong-pass' });
    }
    const r = await request(app).post('/api/auth/login').send(STAFF);
    expect(r.status).toBe(429);
    expect(r.headers['retry-after']).toBeDefined();
  });
});

describe('สิทธิ์ของ PUT / DELETE', () => {
  test('ไม่มี token → 401', async () => {
    const r = await request(app).put('/api/requests/REQ-001').send({ status: 'completed' });
    expect(r.status).toBe(401);
  });

  test('token ของผู้ร้องขอ → 403', async () => {
    const r = await request(app).put('/api/requests/REQ-001')
      .set('Authorization', `Bearer ${tokenFor('requester')}`)
      .send({ status: 'completed' });
    expect(r.status).toBe(403);
  });
  test('token ที่เซ็นด้วย secret อื่น → 401', async () => {
    const r = await request(app).put('/api/requests/REQ-001')
      .set('Authorization', `Bearer ${tokenFor('staff', 'not-the-real-secret')}`)
      .send({ status: 'completed' });
    expect(r.status).toBe(401);
  });
  test('เจ้าหน้าที่เปลี่ยนสถานะ → 200 และลบคำร้อง → 204', async () => {
    const token = await loginAsStaff(app);
    const updated = await request(app).put('/api/requests/REQ-001')
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });
    const deleted = await request(app).delete('/api/requests/REQ-003')
      .set('Authorization', `Bearer ${token}`);
    expect(updated.status).toBe(200);
    expect(deleted.status).toBe(204);
  });
});
