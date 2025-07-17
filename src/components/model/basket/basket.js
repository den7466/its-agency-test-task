export class BasketModel {
  constructor(basketData) {
    this._basketData = basketData;
    this._total = 0;
  }

  set basketData(data) {
    this._basketData = data;
  }

  get basketData() {
    return this._basketData;
  }

  get basketTotal() {
    return this._total;
  }

  get basketCount() {
    let counter = 0;
    this._basketData.forEach(item => {
      if (!item.deleted) counter += item.count;
    });
    return counter;
  }

  existsInBasket(id) {
    if (this._basketData.find(item => item.id === id)) return true;
    else return false;
  }

  calculateBasketTotal(items) {
    let result = 0;
    items.forEach(element => {
      result += element.price;
    });
    return result;
  }

  addToBasketData(data) {
    if (this.existsInBasket(data.id)) {
      this._basketData = this._basketData.map(item => {
        if (item.id === data.id) {
          item.count++;
          item.total = item.price * item.count;
          item.deleted = false;
          return item;
        } else {
          return item;
        }
      });
    } else {
      data.count = 1;
      data.total = data.price * data.count;
      data.deleted = false;
      this._basketData.push(data);
    }
    this._total = this.calculateBasketTotal(this._basketData);
  }

  deleteFromBasketData(id) {
    const result = this._basketData.find(item => item.id === id);
    if (result.count > 1) {
      this._basketData = this._basketData.map(item => {
        if (item.id === id) {
          item.count--;
          item.total = item.price * item.count;
          return item;
        } else {
          return item;
        }
      });
    }
  }

  markDeletionFromBasketData(id) {
    this._basketData = this._basketData.map(item => {
      if (item.id === id) {
        item.deleted = true;
        return item;
      } else {
        return item;
      }
    });
  }

  restoreFromBasketData(id) {
    this._basketData = this._basketData.map(item => {
      if (item.id === id) {
        item.deleted = false;
        return item;
      } else {
        return item;
      }
    });
  }

  clearBasketData() {
    this._basketData = [];
    this._total = 0;
  }
}