class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.addBtn = document.getElementById('add-btn');
        this.todoList = document.getElementById('todo-list');
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];

        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoList.addEventListener('click', (e) => this.handleTodoClick(e));
        
        this.renderTodos();
    }

    addTodo() {
        const todoText = this.todoInput.value.trim();
        if (todoText) {
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            this.todos.push(todo);
            this.saveTodos();
            this.renderTodos();
            this.todoInput.value = '';
        }
    }

    handleTodoClick(e) {
        const target = e.target;
        const itemId = target.closest('.todo-item').dataset.id;

        if (target.classList.contains('complete-btn')) {
            this.toggleComplete(itemId);
        } else if (target.classList.contains('delete-btn')) {
            this.deleteTodo(itemId);
        }
    }

    toggleComplete(id) {
        const todo = this.todos.find(todo => todo.id == id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveTodos();
        this.renderTodos();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        this.todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            todoItem.dataset.id = todo.id;
            todoItem.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button class="complete-btn">✓</button>
                    <button class="delete-btn">🗑</button>
                </div>
            `;
            this.todoList.appendChild(todoItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
