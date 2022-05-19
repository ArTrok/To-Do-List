import { Router } from 'express';
import taskRouter from './todolist';

const router = Router();

router.use('/', taskRouter);

export default router;