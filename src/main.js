import Swiper from 'swiper/bundle';
import './scss/index.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './scss/swiper-custom.scss';
import { renderCatalog } from './components/view/catalog/catalog';
import { getCatalogData } from './components/model/catalog';
import { customSelectInit } from './components/view/select/select';

const filterList = document.querySelector('.filter__list');
const filterItems = filterList.querySelectorAll('.filter__checkbox');
let filters = [];
let sort = 'dear';

const renderCatalogHandler = async (props) => {
  const { filters, sort } = props;
  const catalogData = await getCatalogData({ filters, sort });
  renderCatalog({ catalogData });
};

const filtersHandler = (e) => {
  if ( e.target.checked ) filters.push(e.target.name);
  else filters = filters.filter(item => item !== e.target.name);
  renderCatalogHandler({ filters, sort});
};

const selectHandler = (element) => {
  renderCatalogHandler({ filters, sort: element });
};

filterItems.forEach(input => {
  input.addEventListener('change', filtersHandler);
});

document.addEventListener('DOMContentLoaded', () => customSelectInit(selectHandler));

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
