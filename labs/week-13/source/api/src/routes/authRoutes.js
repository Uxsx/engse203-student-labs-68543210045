import { Router } from "express";
import * as authService from "../services/authService.js";
import { validateLoginInput } from "../validators/requestValidator.js";

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();
const failedLoginAttempts = new Map();
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function getClientKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip ?? "unknown-client";
}

function resetLoginLimiter() {
  failedLoginAttempts.clear();
}

router.post("/login", (req, res) => {
  const clientKey = getClientKey(req);
  const now = Date.now();
  const attemptState = failedLoginAttempts.get(clientKey) ?? {
    count: 0,
    firstAttemptAt: now,
  };

  if (
    attemptState.count >= LOGIN_LIMIT &&
    now - attemptState.firstAttemptAt < LOGIN_WINDOW_MS
  ) {
    return res
      .status(429)
      .json({ error: "พยายามเข้าสู่ระบบผิดเกิน 5 ครั้ง กรุณาลองใหม่ภายหลัง" });
  }

  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ error: "ข้อมูลเข้าสู่ระบบไม่ถูกต้อง", details: errors });
  }

  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    const nextState =
      now - attemptState.firstAttemptAt >= LOGIN_WINDOW_MS
        ? { count: 1, firstAttemptAt: now }
        : {
            count: attemptState.count + 1,
            firstAttemptAt: attemptState.firstAttemptAt || now,
          };
    failedLoginAttempts.set(clientKey, nextState);

    if (nextState.count >= LOGIN_LIMIT) {
      return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }
    return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }

  failedLoginAttempts.delete(clientKey);
  res.status(200).json(result);
});

router.resetLoginLimiter = resetLoginLimiter;
export { resetLoginLimiter };
export default router;
