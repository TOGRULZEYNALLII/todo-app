const button = document.getElementById("button");
const input = document.getElementById("input");
const todo = document.getElementById("todo-container");

button.addEventListener("click", function () {
  var pargraph = document.createElement("p");
  pargraph.innerText = input.value;
  todo.appendChild(pargraph);
});
