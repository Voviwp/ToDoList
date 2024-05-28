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
  if (event.target.classList.contains('delete-button')) {
    const taskId = event.target.closest('.task').dataset.id;
    taskList.removeTask(taskId);
    event.target.closest('.task').remove();
  } else if (event.target.classList.contains('toggle-button')) {
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
      <button class="toggle-button">Toggle</button>
      <button class="delete-button">Delete</button>
    </div>
  `;
  taskListElement.appendChild(taskElement);
}

function renderTasks() {
  taskListElement.innerHTML = '';
  taskList.tasks.forEach(task => addTaskToDOM(task));
}


renderTasks();

taskList.fetchTasksFromAPI().then(renderTasks);
