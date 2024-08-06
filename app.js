
const todosList = document.querySelector(".todos-list");
const button = document.querySelector("button");


document.addEventListener("DOMContentLoaded", loadTodos);


button.addEventListener("click", function(e) {
    e.preventDefault();
    addTodo();
});


function addTodo() {
    const input = document.querySelector('input');
    const value = input.value;
    input.value = "";

    const todoItem = createTodoItem(value, false);
    todosList.append(todoItem);
    saveTodos();
}


function createTodoItem(value, completed) {
    const li = document.createElement('li');
    li.innerText = value;
    li.style.cssText = "position: relative; top: 0; display: inline-block; margin-left: 60px; cursor: pointer; font-size: 35px";
    if(completed) {
        li.style.textDecoration = "line-through";
    }
    li.addEventListener("click", toggleTodo);

    const deleteButton = createDeleteButton();

    const div = document.createElement('div');
    div.style.cssText = "position: relative; width: 700px; height: 100px; display: flex; align-items: center;";
    div.appendChild(deleteButton);
    div.appendChild(li);

    return div;
}


function createDeleteButton() {
    const h3 = document.createElement('h3');
    h3.innerText = "X";
    h3.style.cssText = "position: absolute; border: solid 1px; cursor: pointer; font-size: 35px";
    h3.addEventListener("click", function(e) {
        h3.parentElement.remove();
        saveTodos();
    });

    return h3;
}


function toggleTodo() {
    this.style.textDecoration = this.style.textDecoration === "line-through" ? "none" : "line-through";
    saveTodos();
}


function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todos-list div').forEach(div => {
        const li = div.querySelector('li');
        todos.push({
            text: li.innerText,
            completed: li.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}


function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo.text, todo.completed);
        todosList.append(todoItem);
    });
}
