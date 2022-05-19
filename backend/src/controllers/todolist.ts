import { Request, Response } from 'express';
import TaskService from '../services/todolist';

export default class TaskController {
  private taskService = new TaskService();

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const [code, result] = await this.taskService.getAll();
    return res.status(code).json(result);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { title, details, time, date, status } = req.body;
    const [code, result] = await this.taskService.create(title, details, time, date, status);
    return res.status(code).json(result);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { id, title, details, time, date, status } = req.body;
    const [code, result] = await this.taskService.update(title, details, time, date, status, +id);
    return res.status(code).json(result);
  };

  public destroy = async (req: Request, res: Response): Promise<Response> => {
    const [code, result] = await this.taskService.destroy(+req.params.id);
    return res.status(code).json(result);
  };
}