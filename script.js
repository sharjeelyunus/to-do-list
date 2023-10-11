var button = document.getElementById("add");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
let todos = [];
//from StackOverflow:
function removeParent(evt) {
  evt.target.removeEventListener("click", removeParent, false);
  evt.target.parentNode.remove();
}

//click on a list item and it strikethroughs the text
function getEventTarget(e){
	e = e || window.event;
	return e.target || e.srcElement;
}

ul.onclick = function(event){
	var target = getEventTarget(event);
  target.classList.toggle("done");
  // var trash = getEventTarget(event);
	// target.classList.toggle("trash");
}

function inputLength() {
  return input.value.length;
}

function loadTodoList() {
  
  const todos = JSON.parse(localStorage.getItem("Todos")) || [];

  todos.forEach((todoText) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(todoText));
    ul.appendChild(li);
  });
}

// Call the function to load the list when the page loads.
window.addEventListener("load", loadTodoList);

function createListElement() {
  const inputValue = input.value;
  if (inputValue.trim() === "") {
    return; // Do not add empty todos
  }



  // Retrieve existing todos from localStorage or create an empty array if it doesn't exist.
  const existingTodos = JSON.parse(localStorage.getItem("Todos"));
  if (Array.isArray(existingTodos)) {
    todos = existingTodos;
  }

  // Add the new todo to the array.
  todos.push(inputValue);

  // Store the updated array in localStorage.
  localStorage.setItem("Todos", JSON.stringify(todos));

  // Create a list item for the new todo.
  var li = document.createElement("li");

  li.appendChild(document.createTextNode(inputValue));
  ul.appendChild(li);

  input.value = "";
}



function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);
