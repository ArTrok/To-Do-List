import { Router, Response, Request } from 'express';
import TaskController from '../controllers/todolist';

const taskRouter = Router();

const taskController = new TaskController();

taskRouter.get('/', taskController.getAll);

taskRouter.post(
  '/',
  async (req: Request, res: Response) => {
    await taskController.create(req, res);
  },
);

taskRouter.put(
  '/',
  async (req: Request, res: Response) => {
    await taskController.update(req, res);
  },
);

taskRouter.delete(
  '/:id',
  async (req: Request, res: Response) => {
    await taskController.destroy(req, res);
  },
);

export default taskRouter;