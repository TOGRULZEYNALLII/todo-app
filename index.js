const form = document.querySelector("#form");
const name = document.querySelector("#name");
const tbody = document.querySelector("tbody");
const file = document.querySelector("#file");

const TODOS_KEY = "todos";

let todos = JSON.parse(localStorage.getItem(TODOS_KEY)) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderData();
});

const renderData = () => {
  let innerHTML = "";
  todos.forEach((item) => {
    innerHTML += `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>
        <td>
        <td>
</td >
        <td><button data-id="${item.id}" id="delete-${item.id}">Sil</button></td>
        <td><button update-id="${item.id}" id="update-${item.id}">Yenilə</button></td>
</tr>`;
  });

  tbody.innerHTML = innerHTML;

  todos.forEach((item) => {
    const deleteBtn = document.querySelector(`#delete-${item.id}`);
    const updateBtn = document.querySelector(`#update-${item.id}`);
    deleteBtn.addEventListener("click", () => {
      const id = deleteBtn.getAttribute("data-id");
      todos = todos.filter((item) => item.id !== Number(id));
      renderData();
    });
    updateBtn.addEventListener("click", () => {
      const ids = parseInt(updateBtn.dataset.id);
      const index = todos.findIndex((item) => item.id === ids);
      console.log("index:", index);
      console.log("todos:", todos);
      let yenile = prompt("Enter the updated task name:");
      console.log("yenile:", yenile);
      todos[index].name = yenile;
      renderData();
    });
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const lastElement = todos[todos.length - 1];
  const id = (lastElement?.id || 0) + 1;

  todos.push({
    id,
    name: name.value,
  });

  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

  renderData();

  name.value = "";
});
