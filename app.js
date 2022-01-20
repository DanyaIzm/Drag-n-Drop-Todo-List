loadAll();

let items = document.querySelectorAll(".item");
const placeholders = document.querySelectorAll(".placeholder");
const add = document.querySelector(".add");
const trash = document.querySelector(".trash");

for (const item of items) {
  item.addEventListener("dragstart", dragstart);
  item.addEventListener("dragend", dragend);
  item.addEventListener("dblclick", dblclick);
}

for (const placeholder of placeholders) {
  placeholder.addEventListener("dragover", dragover);
  placeholder.addEventListener("dragenter", dragenter);
  placeholder.addEventListener("dragleave", dragleave);
  placeholder.addEventListener("drop", dragdrop);
}

add.addEventListener("click", addItem);

trash.addEventListener("dragover", trashDragover);
trash.addEventListener("drop", trashDragdrop);

function dragstart(event) {
  event.target.classList.add("hold");
  setTimeout(() => {
    event.target.classList.add("hide");
  }, 0);
  trash.classList.remove("hide");
  add.classList.add("hide");
}

function dragend(event) {
  event.target.classList.remove("hold", "hide");
  trash.classList.add("hide");
  add.classList.remove("hide");
}

function dblclick(event) {
  prevText = event.target.innerHTML;
  text = prompt("Изменить текст", prevText);

  if (text == "" || text == null) {
    alert("Вы ввели пустой текст");
    return;
  }

  event.target.innerHTML = text;
}

function dragover(event) {
  event.preventDefault();
}

function dragenter(event) {
  event.target.classList.add("hovered");
}

function dragleave(event) {
  event.target.classList.remove("hovered");
}

function dragdrop(event) {
  const item = document.querySelector(".hold");
  dragleave(event);
  if (item == null) {
    return;
  }
  if (event.target.classList.contains("item")) {
    event.target.parentNode.prepend(item);
  } else {
    event.target.prepend(item);
  }
  saveAll();
}

function addItem() {
  const start = document.querySelectorAll(".placeholder")[0];
  let text = prompt("Введите задание");

  if (text == "") {
    alert("Вы ввели пустой текст");
    return;
  }

  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.innerHTML = text;
  newItem.setAttribute("draggable", "true");
  newItem.addEventListener("dragstart", dragstart);
  newItem.addEventListener("dragend", dragend);

  start.append(newItem);

  saveAll();
}

function trashDragover(event) {
  event.preventDefault();
}

function trashDragdrop(event) {
  const item = document.querySelector(".hold");
  const item_parent = item.parentNode;
  item_parent.removeChild(item);
  saveAll();
}

function loadAll() {
  const storedData = localStorage.getItem("todoList");
  let todoList = [];

  if (storedData != undefined) {
    todoList = JSON.parse(storedData);
  }

  todoList.forEach((item) => {
    const parentClass = item.class;
    const text = item.text;
    addSavedItem(parentClass, text);
  });
}

function saveAll() {
  const todoList = [];
  updateItems();
  items.forEach((item) => {
    let itemNote = {};
    itemNote.class = item.parentNode.classList[1];
    itemNote.text = item.innerHTML;

    todoList.push(itemNote);
  });
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function updateItems() {
  items = document.querySelectorAll(".item");
}

function addSavedItem(parentClass, text) {
  const parent = document.querySelector(`.${parentClass}`);

  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.innerHTML = text;
  newItem.setAttribute("draggable", "true");
  newItem.addEventListener("dragstart", dragstart);
  newItem.addEventListener("dragend", dragend);

  parent.append(newItem);
}
