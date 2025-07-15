import { createCard } from './card';

export const renderCatalog = (props) => {
  const { catalogData } = props;
  const catalogList = document.querySelector('.catalog__list');
  const template = document.querySelector('#card-template').content;
  catalogList.innerHTML = '';
  catalogData.forEach(element => {
    catalogList.append(createCard({ template, data: element }));
  });
};
