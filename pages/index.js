import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/ToDoCounter.js";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todosList = document.querySelector(".todos__list");

const handleFormSubmit = (data) => {
  const name = data.name;
  const dateInput = data.date;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();
  const values = { name, date, id };
  // Could be improved: use this in place of generateTodo and section.addItem
  // section.renderItem(values) // optional
  const todo = generateTodo(values);
  section.addItem(todo);
  todoCounter.updateTotal(true); // increment completed count
  newTodoValidator.resetValidation();
  addTodoPopup.close();
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit,
});

addTodoPopup.setEventListeners();

const handleCheck = (checked) => {
  todoCounter.updateCompleted(checked);
};
const handleDelete = (completed) => {
  todoCounter.updateTotal(false); // decrement total count
  if (completed) {
    // Decrement completed count only if todo was completed
    todoCounter.updateCompleted(false);
  }
};

// The logic in this function should all be handled in the Todo class.
//moved all of this code into the Todo class
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: [...initialTodos], //pass initial todos
  renderer: (item) => {
    //generate todo item
    //add it to the todo list
    //refer it to the forEach loop in this file
    // initialTodos.forEach((item) => {
    //   const Todo = generateTodo(item);
    //   todosList.append(todo);
    // });
    const element = generateTodo(item);
    section.addItem(element);
  },
  containerSelector: ".todos__list",
});

//call section instance's renderItems method
section.renderItems();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

//instantiate
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
