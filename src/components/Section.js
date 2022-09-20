export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(item) {
    this._containerSelector.append(
      this._renderer(item.name, item.link, item.likes, item._id, item.owner._id)
    );
  }

  rendererAll(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }
}
