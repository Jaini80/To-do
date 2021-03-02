// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

// Functions
const addTodo=(e) => {
    // reload page
    location.reload();
    // Creating all components
    if (todoInput.value == 0)
    {
        alert("enter value");
    }
    else{    
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    todoInput.value="";
    }
}

// delete & check
const deleteCheck=(e) => {
    const item = e.target;
    // delete todo
    if (item.classList.contains("trash-btn")) {
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    // completed todo
    if (item.classList.contains("check-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

// edit
const edit=(e)=>{
    let editValue = prompt('edit the selected value!!', e.firstChild.nodeValue);
    let x = e.firstChild.nodeValue;
    e.firstChild.nodeValue = editValue;
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    for (let i = 0; i < todos.length; i++) {
        if(todos[i]===x){
            const index = x;
            todos.splice(todos.indexOf(index), 1, editValue);
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

// filter
const filterTodo=(e) => {
    const value = e.target.value;
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                return;
        }
    });
}

// Local storage
const saveLocalTodos=(todo) => {
    // CHECK---HEY Do I already have thins in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const getTodos=() => {
    // CHECK---HEY Do I already have thins in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        // Create div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create li
        const newTodo = document.createElement("li");
        newTodo.innerHTML = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Create Completed button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("check-btn");
        todoDiv.appendChild(completedButton);

        // edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit-btn");
        editButton.onclick = () => {
            edit(newTodo);
            // editing(todo);
        };
        todoDiv.appendChild(editButton);

        // delete button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append all
        todoList.appendChild(todoDiv);
    });
}

const removeLocalTodos=(e) => {
    // CHECK---HEY Do I already have thins in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = e.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("change", filterTodo);