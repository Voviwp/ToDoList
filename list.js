import Task from './Task.js';

export default class TaskList {
  constructor() {
    this.tasks = this.loadTasksFromLocalStorage();
  }

  addTask(title) {
    const id = new Date().getTime().toString();
    const task = new Task(id, title);
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
    return task;
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasksToLocalStorage();
  }

  toggleTaskCompletion(id) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.toggleCompletion();
      this.saveTasksToLocalStorage();
    }
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.map(task => new Task(task.id, task.title, task.completed));
  }

  async fetchTasksFromAPI() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      this.tasks = data.slice(0, 10).map(task => new Task(task.id, task.title, task.completed));
      this.saveTasksToLocalStorage();
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
}
