// The selector tells which HTML template to use
const templateSelector = "#todo-template";

class Todo {
  constructor(data, selector = templateSelector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
  }

  _setEventListeners() {
    //delete button handler
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    //set 'change' listener on checkbox el
    this._todoCheckboxEl.addEventListener("change", () => {
      //when clicked, change completion from true to false, or vice versa
      this._data.completed = !this._data.completed;
    });
  }

  _generateDates() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    

    //document.querySelector(this._selector);
    //this._element = todoTemplate.content
    
    

    this._todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateDates();

    return this._todoElement;
  }
}

export default Todo;
