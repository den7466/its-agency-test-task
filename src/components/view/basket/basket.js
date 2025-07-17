export class BasketView {
  constructor(elements, handlers) {
    this._basketData = [];
    this._elements = elements;
    this._handlers = handlers;
  }

  createBasketItem(props) {
    const { template, data } = props;
    const basketItem = template.querySelector('.basket__item').cloneNode(true);
    const basketItemImage = basketItem.querySelector('.basket__image');
    const basketInfo = basketItem.querySelector('.basket__info');
    const basketItemTitle = basketItem.querySelector('.basket__title');
    const basketItemPrice = basketItem.querySelector('.basket__price');
    const basketItemCounterBlock = basketItem.querySelector('.basket__item-counter-block');
    const basketItemCount = basketItem.querySelector('.basket__item-counter');
    const basketItemButtunMinus = basketItem.querySelector('.basket__item-counter-button_minus');
    const basketItemButtunPlus = basketItem.querySelector('.basket__item-counter-button_plus');
    const basketItemButtonDelete = basketItem.querySelector('.basket__item-delete-button');
    const basketItemButtonRestore = basketItem.querySelector('.basket__item-restore-button');
    basketItemImage.src = data.imageUrl;
    basketItemImage.alt = data.imageAlt;
    basketItemTitle.textContent = data.title;
    basketItemPrice.textContent = `${data.total} ₽`;
    basketItemCount.textContent = data.count;
    if (data.deleted) {
      basketItemImage.classList.add('basket__image_deleted');
      basketInfo.classList.add('basket__info_deleted');
      basketItemCounterBlock.classList.add('basket__item-counter-block_deleted');
      basketItemButtonRestore.classList.add('basket__item-restore-button_show');
      basketItemButtonRestore.addEventListener('click', () => this._handlers.basketItemRestoreHandler(data.id));
    } else {
      basketItemButtunMinus.addEventListener('click', () => this._handlers.basketItemMinusHandler(data.id));
      basketItemButtunPlus.addEventListener('click', () => this._handlers.basketItemPlusHandler(data));
      basketItemButtonDelete.addEventListener('click', () => this._handlers.basketItemDeleteHandler(data.id));
      basketItemButtonDelete.classList.add('basket__item-delete-button_show');
    }
    return basketItem;
  }

  buildBasketList(template, basketList) {
    this._basketData.forEach(element => {
      basketList.append(this.createBasketItem({ template, data: element }));
    });
  }

  addBasketItemCounter() {
    let counter = 0;
    this._basketData.forEach(item => {
      if (!item.deleted) counter += item.count;
    });
    this._elements.basketCounter.textContent = `${counter} товаров`;
  }

  addBasketItemTotal() {
    let total = 0;
    this._basketData.forEach(item => {
      if (!item.deleted) total += item.total
    });
    this._elements.basketTotal.textContent = `${total} ₽`;
  }

  render(basketData) {
    this._basketData = basketData;
    this._elements.basketList.replaceChildren();
    this.buildBasketList(this._elements.basketTemplate, this._elements.basketList);
    this.addBasketItemCounter();
    this.addBasketItemTotal();
    this._elements.basketClearButton.addEventListener('click', this._handlers.basketItemClearHandler);
    this._elements.basketSubmitButton.addEventListener('click', this._handlers.basketItemSubmitHandler);
  }
}