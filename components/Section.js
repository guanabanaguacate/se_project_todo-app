class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    console.log(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      //call renderer and pass it the item as an argument
      this._renderer(item);
    });
  }

  addItem(element) {
    //add element to this container
    this._container.append(element);
  }
}

export default Section;
