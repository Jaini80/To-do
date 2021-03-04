// Selectors
const elTodoInput = document.querySelector(".form__input");
const elTodoButton = document.querySelector(".form__button");
const elTodoList = document.querySelector(".todo__list");
const elFilter = document.querySelector(".form__select-opt");

// Functions
const addTodo=(e) => {
    // Creating all components
    if (elTodoInput.value == 0)
    {
        alert("enter value");
    }
    else{    
    // Add todo to local storage
    saveLocalTodos(elTodoInput.value);
    // clear input
    elTodoInput.value="";
    
    elTodoList.innerHTML="";
    getTodos();
    }
}

// delete & check
const deleteCheck=(e) => {
    let item = e.target;
    // delete todo
    if (item.classList.contains("todo__list__container-trashBtn")) {
        const todo = item.parentElement;
        // alert("are you sure");
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', ()=>{
            todo.remove();
        });
    }
    // completed todo
    if (item.classList.contains("todo__list__container-checkBtn")) {
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
    const todos = elTodoList.childNodes;
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
        todoDiv.classList.add("todo__list__container");

        // Create li
        const newTodo = document.createElement("li");
        newTodo.innerHTML = todo;
        newTodo.classList.add("todo__list__container-item");
        todoDiv.appendChild(newTodo);

        // Create Completed button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("todo__list__container-checkBtn");
        todoDiv.appendChild(completedButton);

        // edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("todo__list__container-editBtn");
        editButton.onclick = () => {
            edit(newTodo);
        };
        todoDiv.appendChild(editButton);

        // delete button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("todo__list__container-trashBtn");
        todoDiv.appendChild(trashButton);

        // Append all
        elTodoList.appendChild(todoDiv);
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
elTodoButton.addEventListener("click", addTodo);
elTodoList.addEventListener("click", deleteCheck);
elFilter.addEventListener("change", filterTodo);