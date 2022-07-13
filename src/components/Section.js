export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(item) {
    this._containerSelector.prepend(this._renderer(item.name, item.link));
  }

  rendererAll() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
}
