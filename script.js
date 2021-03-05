// Selectors
const elTodoInput = $(".form__input");
const elTodoButton = $(".form__button");
const elTodoList = $(".todo__list");
const elFilter = $(".form__select-opt");

elTodoButton.click(()=>{
    addTodo();
});
elTodoList.click((e)=>{
    deleteCheck(e);
});
elFilter.click((e)=>{
    filterTodo(e);
});

// Functions
const addTodo=() => {
    // Creating all components
    if (elTodoInput.val() == 0)
    {
        alert("enter value");
    }
    else{
    // Add todo to local storage
    saveLocalTodos(elTodoInput.val());
         
    // clear input
    elTodoInput.val('');
    elTodoList.html('');

    getTodos();
    }
}

// delete & check
const deleteCheck=(e) => {
    let item = e.target;
    // delete todo
    if (item.classList.contains("todo__list__container-trashBtn")) {
        const todo = item.parentElement;
        // animation
        todo.remove();
        removeLocalTodos(todo);
    }
    // completed todo
    if (item.classList.contains("todo__list__container-checkBtn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

// edit
const edit=(e)=>{
    let editValue = prompt('edit the selected value!!', $(e.first("li")).text());
    let x = $(e.first("li")).text();
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
        elTodoList.empty();
        getTodos();
    }
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

// get data
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
        const todoDiv = $("<div class='todo__list__container'></div>");

        // Create li
        const newTodo = $("<li></li>");
        newTodo.html(todo);
        newTodo.addClass("todo__list__container-item");
        todoDiv.append(newTodo);

        // Create Completed button
        const completedButton = $("<button></button>");
        completedButton.html("<i class='fas fa-check'></i>");
        completedButton.addClass("todo__list__container-checkBtn");
        todoDiv.append(completedButton);

        // edit button
        const editButton = $("<button></button>");
        editButton.html('<i class="fas fa-edit"></i>');
        editButton.addClass("todo__list__container-editBtn");
        editButton.click(() => {
            edit(newTodo);
        });
        todoDiv.append(editButton);

        // delete button
        const trashButton = $("<button></button>");
        trashButton.html("<i class='fas fa-trash'></i>");
        trashButton.addClass("todo__list__container-trashBtn");
        todoDiv.append(trashButton);

        // Append all
        elTodoList.append(todoDiv);
    });
}
$( window ).on( "load", getTodos());

// remove from local storage
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
