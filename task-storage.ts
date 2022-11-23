/**
 * * získání všech úkolů,
 * nastavení stavu úkolu dle ID.
 */

import { Task } from './model';

export class TaskStorage {
  private tasks: Task[] = [];

  getTaskById(taskId: number): Task {
    const task = this.tasks.find((t) => t.id === taskId);

    if (task) {
      return task;
    } else {
      throw new Error('Task not found');
    }
  }

  createTask(taskName: string): void {
    this.tasks.push({
      id: this.generateId(),
      name: taskName,
      complete: false,
    });
  }

  deleteTask(taskId: number): void {
    const taskIndex = this.tasks.findIndex((t) => t.id === taskId);

    // found the task
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  setTaskStatus(taskId: number, status: boolean) {
    this.getTaskById(taskId).complete = status;
  }

  private generateId(): number {
    return Math.max(0, ...this.tasks.map((t) => t.id)) + 1;
  }
}
