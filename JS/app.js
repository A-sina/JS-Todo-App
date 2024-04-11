const addTodo = document.getElementById("get-todo");
const addDate = document.getElementById("get-date");
const addBTN = document.getElementById("add-button");
const editBTN = document.getElementById("edit-button");
const alertMessage = document.querySelector(".alert");
const deleteBTN = document.querySelector(".delete-all");
const allBTN = document.querySelector(".All");
const completeBTN = document.querySelector(".completed");
const pendingBTN = document.querySelector(".pending");
const table = document.getElementById("table-body");

let todos = JSON.parse(localStorage.getItem("items")) || [];


const idGenarator = () => {
    return Math.ceil(Math.random() * Math.random() * Math.pow(10, 15).toString());
}


function setItem() {
    localStorage.setItem("items", JSON.stringify(todos))
}


const showAlert = (text, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("p");
    alert.innerText = text;
    alert.classList.add(`alert-${type}`)
    alertMessage.append(alert);
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000)
}


const displayTodos = (data) => {
    const newTodos = data || todos;
    table.innerHTML = "";
    if (!newTodos.length) {
        table.innerHTML = "<tr><td colspan= '4'> there is nothing </td></tr>"
        return;
    }
    newTodos.forEach(todo => {
        table.innerHTML += `
        <tr>
           <td>${todo.itemTodo}</td>
           <td>${todo.dateTodo || "no date"}</td>
           <td>${todo.completed ?"completed":"pending"}</td>
           <td>
               <button onclick="editHandler(${todo.id})">edit</button>
               <button onclick="doneHandler(${todo.id})">${todo.completed ? "undo":"do"}</button>
               <button onclick="deleteHandler('${todo.id}')">delete</button>
           </td>
           </tr>    `
    });
}


const editHandler = (id) => {
    const todo = todos.find((todo) => todo.id == id)
    addTodo.value = todo.itemTodo;
    addDate.value = todo.dateTodo;
    addBTN.style.display = "none";
    editBTN.style.display = "inline-block";
    editBTN.dataset.id = id;
}


const doneHandler = (id) => {
    const todo = todos.find((todo) => todo.id == id)
    todo.completed = !todo.completed;
    setItem();
    displayTodos();
    showAlert("changed successfully", "success");
} 


function getTodo() {
    const itemTodo = addTodo.value;
    const dateTodo = addDate.value;
    const list = {
        id: idGenarator(),
        itemTodo,
        dateTodo,
        completed: false,
    }
    if (itemTodo) {
        todos.push(list);
        setItem();
        displayTodos();
        addTodo.value = "";
        dateTodo.value = "";
        showAlert("Done", "success");
    } else {
        showAlert("please input something", "fail");
    }
}


const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id)
    todos = newTodos;
    setItem();
    displayTodos();
    showAlert("delete successfuly", "success")
}


const deleteAll = () => {
    if (todos.length) {
        todos = [];
        localStorage.clear();
        displayTodos();
        showAlert("all todos cleared", "success");
        return;
    } else {
        showAlert("there is nothing to clear", "fail")
    }
}


const editChecker = (event) => {
    let id = event.target.dataset.id;
    const todo = todos.find((todo) => todo.id == id)
    todo.itemTodo = addTodo.value;
    todo.dateTodo = addDate.value;
    addBTN.style.display = "inline-block";
    editBTN.style.display = "none";
    addTodo.value = "";
    addDate.value = "";
    displayTodos();
    setItem();
    showAlert("edited successfully", "success")
}


const completeHandler = () => {
    const newTodo = todos.filter((todo) => todo.completed)
    console.dir(newTodo)
    displayTodos(newTodo);
    showAlert("filtered successfully", "success")
}


const pendingHandler = () => {
    const newTodo = todos.filter((todo) => !todo.completed)
    console.dir(newTodo)
    displayTodos(newTodo);
    showAlert("filtered successfully", "success")
}


const showAll = () => {
    const newTodo = todos;
    displayTodos(newTodo);
    setItem();
    showAlert("filtered successfully", "success");
}


addBTN.addEventListener("click", getTodo);
deleteBTN.addEventListener("click", deleteAll);
editBTN.addEventListener("click", editChecker);
window.addEventListener("load", () => displayTodos());
completeBTN.addEventListener("click", completeHandler);
pendingBTN.addEventListener("click", pendingHandler);
allBTN.addEventListener("click", showAll);