class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item) => {
        //call renderer and pass it the item as an argument
        renderer(item)

    addItem(//element){
 //add element to this container
 todoList.append(todo);
    }
}
  
}
}

export default Section;
