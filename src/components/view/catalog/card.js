export const createCard = (props) => {
  const { template, data } = props;
  const catalogItem = template.querySelector('.catalog__item').cloneNode(true);
  const cardImage = catalogItem.querySelector('.card__image');
  const cardTitle = catalogItem.querySelector('.card__title');
  const cardPrice = catalogItem.querySelector('.card__price');
  cardImage.src = data.imageUrl;
  cardImage.alt = data.imageAlt;
  cardTitle.textContent = data.title;
  cardPrice.textContent = data.price;
  return catalogItem;
};
