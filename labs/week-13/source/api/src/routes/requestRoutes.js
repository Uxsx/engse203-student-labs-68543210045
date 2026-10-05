import { Router } from 'express';
import * as controller from '../controllers/requestController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

import { authenticate, requireRole } from '../middleware/auth.js';

router.get('/', controller.listRequests);
router.post('/', validateRequest, controller.createRequest);
router.get('/:id', controller.getRequest);
// Week 13 — เปลี่ยนสถานะและลบได้เฉพาะเจ้าหน้าที่
router.put('/:id', authenticate, requireRole('staff'), controller.updateRequestStatus);
router.delete('/:id', authenticate, requireRole('staff'), controller.deleteRequest);

export default router;
