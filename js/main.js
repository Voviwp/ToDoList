import TaskList from './TaskList.js';

const taskList = new TaskList();
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskListElement = document.getElementById('taskList');

addTaskButton.addEventListener('click', () => {
  const title = taskInput.value.trim();
  if (title) {
    const task = taskList.addTask(title);
    addTaskToDOM(task);
    taskInput.value = '';
  }
});

taskListElement.addEventListener('click', (event) => {
  if (event.target.closest('.delete-button')) {
    const taskId = event.target.closest('.task').dataset.id;
    taskList.removeTask(taskId);
    event.target.closest('.task').remove();
  } else if (event.target.closest('.toggle-button')) {
    const taskId = event.target.closest('.task').dataset.id;
    taskList.toggleTaskCompletion(taskId);
    event.target.closest('.task').classList.toggle('completed');
  }
});

function addTaskToDOM(task) {
  const taskElement = document.createElement('li');
  taskElement.className = `task ${task.completed ? 'completed' : ''}`;
  taskElement.dataset.id = task.id;
  taskElement.innerHTML = `
    <span>${task.title}</span>
    <div>
      <button class="toggle-button"><i class="fas fa-check"></i></button>
      <button class="delete-button"><i class="fas fa-trash"></i></button>
    </div>
  `;
  taskListElement.appendChild(taskElement);
}

function renderTasks() {
  taskListElement.innerHTML = '';
  taskList.tasks.forEach(task => addTaskToDOM(task));
}

// Initial rendering of tasks
renderTasks();

// Optionally, fetch tasks from API and update DOM
taskList.fetchTasksFromAPI().then(renderTasks);
