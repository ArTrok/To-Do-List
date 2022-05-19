import ITask from '../interfaces/ITask';
import TaskModel from '../models/todolist';
import connection from '../models/connection';

export default class TaskService {
  private taskModel: TaskModel;

  constructor() {
    this.taskModel = new TaskModel(connection);
  }

  public async getAll(): Promise<[number, ITask[]]> {
    const result = await this.taskModel.getAll();
    return [200, result];
  }

  public async create(title: string, details: string, time: string, date: string, status: string): Promise<[number, number]> {
    const insertId = await this.taskModel.create(title, details, time, date, status);
    return [201, insertId];
  }

  public async update(title: string, details: string, time: string, date: string, status: string): Promise<[number, {}]> {
    await this.taskModel.create(title, details, time, date, status);
    return [201, {}];
  }

  public async destroy(id: number): Promise<[number, {}]> {
    await this.taskModel.destroy(id);
    return [204, {}];
  }
}