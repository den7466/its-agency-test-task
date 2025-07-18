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
const basketModal = basketModalOverlay.querySelector('.basket-modal');
const filtersModalOverlay = document.querySelector('#filters');
const filtersModal = filtersModalOverlay.querySelector('.filters-modal');
const filtersOpenButton = document.querySelector('.mobile__filters-button');
const filtersCloseButton = filtersModal.querySelector('.filters-modal__close-button');
const basketCounter = basketModal.querySelector('.basket__counter');
const basketTotal = basketModal.querySelector('.basket__total');
const basketClearButton = basketModal.querySelector('.basket__clear-button');
const basketSubmitButton = basketModal.querySelector('.basket__button-submit');
const modalCloseButton = basketModal.querySelector('.modal__button-close');
const filterMainList = document.querySelector('#main-filters');
const filterMainItems = filterMainList.querySelectorAll('.filter__checkbox');
const filterModalList = filtersModal.querySelector('#modal-filters');
const filterModalItems = filterModalList.querySelectorAll('.filter__checkbox');
const basketButton = document.querySelector('.header__controls-button_basket');
const catalogCounter = document.querySelector('.catalog__counter');
const mobileMenuOpenButton = document.querySelector('.mobile__menu-button');
const mobileMenuOverlay = document.querySelector('#mobile-menu');
const mobileMenuModal = mobileMenuOverlay.querySelector('.mobile-menu');
const mobileMenuCloseButton = mobileMenuModal.querySelector('.modal__button-close');
let filters = [];
let sort = 'dear';
const catalogModel = new CatalogModel(await getAllCards());
const basketData = new BasketModel(JSON.parse(localStorage.getItem('basket')) || []);

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
  document.body.classList.add('no-scroll');
  basketModalOverlay.classList.add('overlay_open');
  basketModal.classList.add('basket-modal_open');
  basketView.render(basketData.basketData);
};

const closeModalHandler = (e) => {
  document.body.classList.remove('no-scroll');
  const modal = e.target.parentNode.parentNode;
  const overlay = modal.parentNode;
  modal.classList.remove('basket-modal_open');
  overlay.classList.remove('overlay_open');
  renderPageHandler();
};

const closeBasketModalOverlayHandler = (e) => {
  if(e.target.classList.contains('overlay')) {
    document.body.classList.remove('no-scroll');
    basketModal.classList.remove('basket-modal_open');
    e.target.classList.remove('overlay_open');
    renderPageHandler();
  }
};

const openFiltersModalHandler = () => {
  document.body.classList.add('no-scroll');
  filtersModalOverlay.classList.add('overlay_open');
  filtersModal.classList.add('filters-modal_open');
};

const closeFiltersModalHandler = () => {
  document.body.classList.remove('no-scroll');
  filtersModalOverlay.classList.remove('overlay_open');
  filtersModal.classList.remove('filters-modal_open');
}

const closeFiltersModalOverlayHandler = (e) => {
  if(e.target.classList.contains('overlay')) {
    document.body.classList.remove('no-scroll');
    filtersModal.classList.remove('filters-modal_open');
    e.target.classList.remove('overlay_open');
    renderPageHandler();
  }
};

const openMobileMenuHandler = () => {
  document.body.classList.add('no-scroll');
  mobileMenuOverlay.classList.add('overlay_open');
  mobileMenuModal.classList.add('mobile-menu_open');
};

const closeMobileMenuHandler = () => {
  document.body.classList.remove('no-scroll');
  mobileMenuOverlay.classList.remove('overlay_open');
  mobileMenuModal.classList.remove('mobile-menu_open');
};

const closeMobileMenuOverlayHandler = (e) => {
  if(e.target.classList.contains('overlay')) {
    document.body.classList.remove('no-scroll');
    mobileMenuModal.classList.remove('mobile-menu_open');
    e.target.classList.remove('overlay_open');
    renderPageHandler();
  }
};

filterMainItems.forEach(input => {
  input.addEventListener('change', filtersHandler);
});

filterModalItems.forEach(input => {
  input.addEventListener('change', filtersHandler);
});

basketButton.addEventListener('click', openBasketModalHandler);
modalCloseButton.addEventListener('click', closeModalHandler);
basketModalOverlay.addEventListener('click', closeBasketModalOverlayHandler);
filtersOpenButton.addEventListener('click', openFiltersModalHandler);
filtersCloseButton.addEventListener('click', closeFiltersModalHandler);
filtersModalOverlay.addEventListener('click', closeFiltersModalOverlayHandler);
mobileMenuOpenButton.addEventListener('click', openMobileMenuHandler);
mobileMenuCloseButton.addEventListener('click', closeMobileMenuHandler);
mobileMenuOverlay.addEventListener('click', closeMobileMenuOverlayHandler);

customSelectInit(selectHandler);
renderPageHandler();
renderCatalogHandler({ filters, sort});

// init Swiper:
new Swiper('.swiper', {
  // loop: true,
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
