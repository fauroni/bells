// Global variable to store tasks as an array of objects
let tasks = [];

// Function to render tasks in the UI
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(task.id);
    });
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      editTask(task.id);
    });

    
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const newTaskInput = document.getElementById('newTask');
  const text = newTaskInput.value;
  if (text.trim()!== '') {
    const newTask = {
      id: Date.now(),
      text: text
    };
    tasks.push(newTask);
    newTaskInput.value = '';
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id!== taskId);
  renderTasks();
}

// Function to edit a task
function editTask(taskId) {
  const newText = prompt('Edit the task:', tasks.find(task => task.id === taskId).text);
  if (newText!== null && newText.trim()!== '') {
    tasks = tasks.map(task => {
      if (task.id === taskId) {
        task.text = newText;
      }
      return task;
    });
    renderTasks();
  }
}

// Event listener for adding a task when the button is clicked
const addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', addTask);

// Fetch data from a JSON resource (simulated local data for example)
function fetchTasksFromJSON() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sampleJSONData = '[{"id":1,"text":"Buy groceries"},{"id":2,"text":"Do laundry"}]';
      const parsedData = JSON.parse(sampleJSONData);
      resolve(parsedData);
    }, 1000);
  });
}

// Function to load tasks from JSON (async operation)
async function loadTasks() {
  try {
    const jsonTasks = await fetchTasksFromJSON();
    tasks = tasks.concat(jsonTasks.map(task => ({
      id: task.id,
      text: task.text
    })));
    renderTasks();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Call the loadTasks function to load initial data (simulated async call)
loadTasks();