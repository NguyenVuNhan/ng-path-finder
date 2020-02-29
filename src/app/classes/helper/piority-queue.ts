export class PriorityQueue<T> {
  tasks: { priority: number, task: T }[];

  constructor() {
    this.tasks = [];
  }

  put(task: T, priority: number) {
    let i = 0;
    while (i < this.tasks.length) {
      if (this.tasks[i].priority <= priority) {
        break;
      }
      i++;
    }
    this.tasks.splice(i, 0, {priority, task});
  }

  get() {
    return this.tasks.pop().task;
  }

  empty() {
    return this.tasks.length === 0;
  }
}
