import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import ITask from '../interfaces/ITask';

export default class TaskModel {
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

  public async update(id: number, title: string, details: string, time: string, date: string, status: string): Promise<void> {
    await this.connection
      .execute<ResultSetHeader>(`
        UPDATE Todolist.Tasks
        SET title = ?, details = ?, time = ?, date = ?, status = ?
        WHERE id = ?`,
        [title, details, time, date, status, id]);
  }

  public async destroy(id: number): Promise<number> {
    await this.connection
      .execute<ResultSetHeader>(
        'DELETE FROM Todolist.Tasks WHERE id = ?',
        [id]);
    return 204;
  }
}