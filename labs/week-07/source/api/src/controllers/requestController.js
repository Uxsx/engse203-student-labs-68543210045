import {
  create,
  findAll,
  findById,
  loadSeed,
  remove,
  updateStatus,
} from "../services/requestService.js";

const VALID_STATUSES = ["pending", "in-progress", "completed"];

export function listRequests(req, res) {
  const { status } = req.query;
  res.json(findAll(status ? { status } : undefined));
}

export function getRequest(req, res) {
  const request = findById(req.params.id);

  if (!request) {
    return res.status(404).json({ error: `ไม่พบคำร้อง ${req.params.id}` });
  }

  return res.json(request);
}

export function createRequest(req, res) {
  const created = create(req.body);
  return res.status(201).json(created);
}

export function updateRequestStatus(req, res) {
  const { status } = req.body ?? {};

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: "สถานะไม่ถูกต้อง",
      details: ["status ต้องเป็น pending, in-progress หรือ completed"],
    });
  }

  const updated = updateStatus(req.params.id, status);

  if (!updated) {
    return res.status(404).json({ error: `ไม่พบคำร้อง ${req.params.id}` });
  }

  return res.json(updated);
}

export function deleteRequest(req, res) {
  if (!remove(req.params.id)) {
    return res.status(404).json({ error: `ไม่พบคำร้อง ${req.params.id}` });
  }

  return res.status(204).send();
}

export async function resetRequests(req, res) {
  const requests = await loadSeed();
  return res.json(requests);
}
