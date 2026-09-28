import { apiFetch, ApiError } from "./apiClient.js";

/**
 * Week 07 — เปลี่ยนจากอ่าน localStorage เป็นเรียก API จริง
 *
 * สังเกตว่า signature ของทุกฟังก์ชันเหมือนเดิมทุกตัว
 * → DashboardPage, RequestDetailPage, NewRequestPage ไม่ต้องแก้เลย
 * นี่คือประโยชน์ของ Service Layer ที่เราสร้างไว้ตั้งแต่ Week 05
 */

export { ApiError };

export async function getRequests(options = {}) {
  // scenario ยังใช้ได้เหมือนเดิม เพื่อให้ทดสอบสถานะต่าง ๆ ได้โดยไม่ต้องแกล้ง API
  if (options.scenario === "error") {
    throw new ApiError("LAB scenario: จำลองการโหลดข้อมูลไม่สำเร็จ", 500);
  }
  if (options.scenario === "empty") return [];

  const query = options.status
    ? `?status=${encodeURIComponent(options.status)}`
    : "";

  try {
    return await apiFetch(`/api/requests${query}`);
  } catch (error) {
    if (window.location.hostname.endsWith("github.io")) {
      const response = await fetch("./data/initialRequests.json");

      if (response.ok) {
        const requests = await response.json();
        return options.status
          ? requests.filter((request) => request.status === options.status)
          : requests;
      }
    }

    throw error;
  }
}

export async function getRequestById(requestId) {
  try {
    return await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`);
  } catch (error) {
    if (window.location.hostname.endsWith("github.io")) {
      const response = await fetch("./data/initialRequests.json");
      if (response.ok) {
        const requests = await response.json();
        return requests.find((request) => request.id === requestId) ?? null;
      }
    }

    // 404 ไม่ใช่ความผิดพลาดของระบบ — แปลว่าไม่มีคำร้องรหัสนี้
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function addRequest(requestInput) {
  return apiFetch("/api/requests", {
    method: "POST",
    body: JSON.stringify(requestInput),
  });
}

export async function updateRequestStatus(requestId, status) {
  return apiFetch(`/api/requests/${encodeURIComponent(requestId)}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export async function deleteRequest(requestId) {
  await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`, {
    method: "DELETE",
  });
  // คืนรายการล่าสุดจากเซิร์ฟเวอร์ เพื่อให้หน้าจอตรงกับข้อมูลจริงเสมอ
  return getRequests();
}

export async function resetRequests() {
  try {
    return await apiFetch("/api/requests/reset", { method: "POST" });
  } catch {
    const response = await fetch("./data/initialRequests.json");
    return response.ok ? response.json() : [];
  }
}
