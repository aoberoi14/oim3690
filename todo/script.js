// State
let tasks = [];

// DOM references
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const summary = document.getElementById('summary');
const clearBtn = document.getElementById('clearBtn');

// Add a task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text: text, done: false });
  taskInput.value = '';
  render();
}

// Toggle done state
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  render();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

// Clear completed tasks
function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  render();
}

// Render the list and summary
function render() {
  taskList.innerHTML = '';

  tasks.forEach(function(task) {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', function() {
      toggleTask(task.id);
    });

    const span = document.createElement('span');
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  summary.textContent = total === 0 ? '' : done + ' of ' + total + ' completed';
}

// Event listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addTask();
});

clearBtn.addEventListener('click', clearCompleted);

// Initial render
render();