const form = document.querySelector("#form");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const tbody = document.querySelector("tbody");
const search = document.querySelector("#search");
const submitBtn = document.querySelector("#submit-btn");
const idInput = document.querySelector("#id");

const TODOS_KEY = "todos";

let todos = JSON.parse(localStorage.getItem(TODOS_KEY)) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderData();
});

const renderData = (data = todos) => {
  let innerHTML = "";
  data.forEach((item) => {
    innerHTML += `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.createdAt}</td>
        <td>${item.updatedAt || "No info"}</td>
        <td>
        <button class="btn btn-danger" data-id="${item.id}" id="delete-${
      item.id
    }">Delete</button>
        <button class="btn btn-success" data-id="${item.id}" id="edit-${
      item.id
    }">Edit</button>
        </td>
</tr>`;
  });

  tbody.innerHTML = innerHTML;

  data.forEach((item) => {
    const deleteBtn = document.querySelector(`#delete-${item.id}`);
    const editBtn = document.querySelector(`#edit-${item.id}`);

    deleteBtn.addEventListener("click", () => {
      const id = deleteBtn.getAttribute("data-id");
      todos = todos.filter((item) => item.id !== Number(id));
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos)); // Fix: stringify todos before setting in local storage
      renderData();
    });

    editBtn.addEventListener("click", () => {
      const id = editBtn.getAttribute("data-id");
      const currentLine = todos.find((item) => item.id === Number(id));
      name.value = currentLine.name;
      description.value = currentLine.description;
      idInput.value = currentLine.id;
      submitBtn.textContent = "Update";
    });
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const currentLineId = idInput.value;

  if (currentLineId) {
    const index = todos.findIndex((item) => item.id === Number(currentLineId));
    todos[index].name = name.value;
    todos[index].description = description.value;
    todos[index].updatedAt = new Date().toISOString();
    submitBtn.textContent = "Add";
    idInput.value = "";
  } else {
    const lastElement = todos[todos.length - 1];
    const id = (lastElement?.id || 0) + 1;
    todos.push({
      id,
      name: name.value,
      description: description.value,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    });
  }

  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

  renderData();

  name.value = "";
  description.value = "";
});

search.addEventListener("keyup", (e) => {
  const value = search.value.toUpperCase();
  if (value) {
    const newTodos = todos.filter((item) => {
      return (
        item.name.toUpperCase().includes(value) ||
        item.description.toUpperCase().includes(value)
      );
    });
    renderData(newTodos);
    return;
  }

  renderData();
});
