export class Queue<T> {
  tasks: T[];

  constructor() {
    this.tasks = [];
  }

  put(newTask: T) {
    this.tasks.unshift(newTask);
  }

  get() {
    return this.tasks.pop();
  }

  empty() {
    return this.tasks.length === 0;
  }
}
