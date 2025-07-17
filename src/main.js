import Swiper from 'swiper/bundle';
import './scss/index.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './scss/swiper-custom.scss';
import { CatalogView } from './components/view/catalog/catalog';
import { customSelectInit } from './components/view/select/select';
import { BasketModel } from './components/model/basket/basket';
import { BasketView } from './components/view/basket/basket';
import { CatalogModel } from './components/model/catalog/catalog';
import { getAllCards } from './components/base/api';

const catalogTemplate = document.querySelector('#card-template').content;
const basketTemplate = document.querySelector('#basket-template').content;
const catalogList = document.querySelector('.catalog__list');
const basketList = document.querySelector('.basket__list');
const basketModalOverlay = document.querySelector('#basket');
const basketModal = basketModalOverlay.querySelector('.modal');
const basketCounter = basketModal.querySelector('.basket__counter');
const basketTotal = basketModal.querySelector('.basket__total');
const basketClearButton = basketModal.querySelector('.basket__clear-button');
const basketSubmitButton = basketModal.querySelector('.basket__button-submit');
const modalCloseButton = document.querySelector('.modal__button-close');
const filterList = document.querySelector('.filter__list');
const filterItems = filterList.querySelectorAll('.filter__checkbox');
const basketButton = document.querySelector('.header__controls-button_basket');
const catalogCounter = document.querySelector('.catalog__counter');
const catalogModel = new CatalogModel(await getAllCards());
const basketData = new BasketModel([
  {
    "title": "Краска Wallquest, Brownsone MS90102",
    "imageUrl": "./images/catalog1.jpg",
    "imageAlt": "imageAlt 1",
    "tags": [
      "new"
    ],
    "price": 6000,
    "rating": 0,
    "id": "1",
    "count": 2,
    "total": 12000,
    "deleted": true
  },
  {
    "title": "Краска Wallquest, Brownsone MS90102",
    "imageUrl": "./images/catalog2.jpg",
    "imageAlt": "imageAlt 2",
    "tags": [
      "new"
    ],
    "price": 4800,
    "rating": 60,
    "id": "2",
    "count": 1,
    "total": 4800,
    "deleted": false
  },
]);

let filters = [];
let sort = 'dear';

const basketItemMinusHandler = (id) => {
  basketData.deleteFromBasketData(id);
  basketView.render(basketData.basketData);
};

const basketItemPlusHandler = (data) => {
  basketData.addToBasketData(data);
  basketView.render(basketData.basketData);
};

const basketItemDeleteHandler = (id) => {
  basketData.markDeletionFromBasketData(id);
  basketView.render(basketData.basketData);
};

const basketItemRestoreHandler = (id) => {
  basketData.restoreFromBasketData(id);
  basketView.render(basketData.basketData);
};

const basketItemClearHandler = () => {
  basketData.clearBasketData();
  basketView.render(basketData.basketData);
};

const basketItemSubmitHandler = () => {
  console.log('Заказ оформлен!');
};

const renderPageHandler = () => {
  if ( basketData.basketCount > 0 ) {
    basketButton.classList.add('header__controls-button_basket-not-empty');
    basketButton.textContent = basketData.basketCount.toString();
  } else {
    basketButton.textContent = '';
    basketButton.classList.remove('header__controls-button_basket-not-empty');
  }

  catalogCounter.textContent = `${catalogModel.catalogData.length} товаров`;
}

const addToBasketHandler = (data) => {
  basketData.addToBasketData(data);
  basketView.render(basketData.basketData);
  renderPageHandler();
}

const catalogView = new CatalogView({ catalogTemplate, catalogList }, { addToBasketHandler });
const basketView = new BasketView(
  {
    basketTemplate,
    basketList,
    basketCounter,
    basketTotal,
    basketClearButton,
    basketSubmitButton,
  },
  {
    basketItemMinusHandler,
    basketItemPlusHandler,
    basketItemDeleteHandler,
    basketItemRestoreHandler,
    basketItemClearHandler,
    basketItemSubmitHandler,
});

const renderCatalogHandler = async (props) => {
  const { filters, sort } = props;
  const catalogdata = await catalogModel.catalogFilterAndSort({ filters, sort });
  catalogView.render(catalogdata);
};

const filtersHandler = (e) => {
  if ( e.target.checked ) filters.push(e.target.name);
  else filters = filters.filter(item => item !== e.target.name);
  renderCatalogHandler({ filters, sort});
};

const selectHandler = (element) => {
  renderCatalogHandler({ filters, sort: element });
};

const openBasketModalHandler = () => {
  basketModalOverlay.classList.add('overlay_open');
  basketModal.classList.add('modal_open');
  basketView.render(basketData.basketData);
};

const closeModalHandler = (e) => {
  const modal = e.target.parentNode.parentNode;
  const overlay = modal.parentNode;
  modal.classList.remove('modal_open');
  overlay.classList.remove('overlay_open');
  renderPageHandler();
};

filterItems.forEach(input => {
  input.addEventListener('change', filtersHandler);
});

customSelectInit(selectHandler);
basketButton.addEventListener('click', openBasketModalHandler);
modalCloseButton.addEventListener('click', closeModalHandler);

renderPageHandler();
renderCatalogHandler({ filters, sort});

// init Swiper:
new Swiper('.swiper', {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
