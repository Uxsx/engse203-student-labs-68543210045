import { describe, expect, test, vi } from 'vitest';
import { AppError, asyncHandler, errorHandler, notFound } from '../../src/middleware/errorHandler.js';
import { logger } from '../../src/middleware/logger.js';

function mockResponse() {
  const res = {
    statusCode: 200,
    status: vi.fn(function setStatus(code) {
      this.statusCode = code;
      return this;
    }),
    json: vi.fn(function sendJson(body) {
      this.body = body;
      return this;
    }),
    on: vi.fn(),
  };
  return res;
}

describe('error middleware', () => {
  test('AppError กำหนด status ได้เอง', () => {
    const error = new AppError('ข้อมูลไม่ถูกต้อง', 422);
    expect(error.message).toBe('ข้อมูลไม่ถูกต้อง');
    expect(error.status).toBe(422);
  });

  test('asyncHandler ส่ง rejection ต่อให้ error handler', async () => {
    const next = vi.fn();
    const error = new Error('async failed');
    asyncHandler(() => Promise.reject(error))({}, mockResponse(), next);
    await Promise.resolve();
    await Promise.resolve();
    expect(next).toHaveBeenCalledWith(error);
  });

  test('notFound ตอบ 404 พร้อม method และ URL', () => {
    const res = mockResponse();
    notFound({ method: 'GET', originalUrl: '/missing' }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.body.error).toBe('ไม่พบเส้นทาง GET /missing');
  });

  test('errorHandler ส่งข้อความ error สำหรับข้อผิดพลาด 4xx', () => {
    const res = mockResponse();
    errorHandler(new AppError('ไม่อนุญาต', 403), {}, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.body.error).toBe('ไม่อนุญาต');
    expect(res.body.stack).toBeInstanceOf(Array);
  });

  test('errorHandler ซ่อนรายละเอียดและบันทึกข้อผิดพลาด 5xx', () => {
    const res = mockResponse();
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      errorHandler(new Error('database secret'), {}, res, vi.fn());
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.body.error).toBe('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
      expect(log).toHaveBeenCalled();
    } finally {
      log.mockRestore();
    }
  });
});

describe('logger middleware', () => {
  test('ลงทะเบียน log หลัง response จบและเรียก next', () => {
    const res = mockResponse();
    const next = vi.fn();
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      logger({ method: 'GET', originalUrl: '/api', }, res, next);
      expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
      expect(next).toHaveBeenCalled();
      res.on.mock.calls[0][1]();
      expect(log).toHaveBeenCalledWith(expect.stringMatching(/GET \/api → 200 \(\d+ms\)/));
    } finally {
      log.mockRestore();
    }
  });
});