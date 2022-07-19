const addTaskBtn = document.getElementById('add_task_btn');
const descriptionTask = document.getElementById('description_task');
const todoWrapper = document.querySelector('.todo_wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')); 

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
};

const createTemplate = (task, index) => {
    return `
        <div class="todo_item ${task.completed ? 'checked' : ''}">
            <div class="todo_description ${task.completed ? 'checked' : ''}">${task.description}</div>         
            <div class="todo_btns ${task.completed ? 'checked' : ''}">
                <input onclick="completeTask(${index})" class="todo_btns_complete " type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="todo_btns_delete ${task.completed ? 'checked' : ''}">Delete</button>
            </div>       
        </div>
    `
};

const fillHtmlList = () => {
    todoWrapper.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo_item');
    };
};
fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
};

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(descriptionTask.value));
    updateLocal();  
    fillHtmlList();
    descriptionTask.value = '';
});

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
};