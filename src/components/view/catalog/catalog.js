export class CatalogView {
  constructor(elements, handlers) {
    this._catalogData = [];
    this._elements = elements;
    this._handlers = handlers;
  }

  createCatalogItem(props) {
    const { template, data } = props;
    const catalogItem = template.querySelector('.catalog__item').cloneNode(true);
    const cardImage = catalogItem.querySelector('.card__image');
    const cardTitle = catalogItem.querySelector('.card__title');
    const cardPrice = catalogItem.querySelector('.card__price');
    const cardButton = catalogItem.querySelector('.card__button');
    cardImage.src = data.imageUrl;
    cardImage.alt = data.imageAlt;
    cardTitle.textContent = data.title;
    cardPrice.textContent = `${data.price} ₽`;
    cardButton.addEventListener('click', () => this._handlers.addToBasketHandler(data));
    return catalogItem;
  }

  buildCatalogList(template, catalogList) {
    this._catalogData.forEach(element => {
      catalogList.append(this.createCatalogItem({ template, data: element }));
    });
  }

  render(catalogData) {
    this._catalogData = catalogData;
    this._elements.catalogList.replaceChildren();
    this.buildCatalogList(this._elements.catalogTemplate, this._elements.catalogList);
  }
}
