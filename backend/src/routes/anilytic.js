
import express from 'express';
import { analyticController } from '../controllers/analytic.controller.js';

const router = express.Router();


router.get('/analytics', analyticController.analytics);
router.get('/analyst', analyticController.analysticTotal);
router.get('/analytics-month', analyticController.analyticMonth);

export default router;
