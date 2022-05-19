import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import ITask from '../interfaces/ITask';

export default class OrderModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<ITask[]> {
    const [result] = await this.connection
      .execute<RowDataPacket[]>('SELECT * FROM Todolist.Tasks');
    return result as ITask[];
  }

  public async create(title: string, details: string, time: string, date: string, status: string): Promise<number> {
    const [{ insertId }] = await this.connection
      .execute<ResultSetHeader>(
        'INSERT Todolist.Tasks(title, details, time, date, status) VALUES (?,?,?,?,?)',
        [title, details, time, date, status]);
    return insertId;
  }
}