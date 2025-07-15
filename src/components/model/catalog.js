import { getAllCards } from '../base/api';

const dearSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const less = arr.slice(1).filter(item => item.price > pivot.price);
    const greater = arr.slice(1).filter(item => item.price < pivot.price);
    const equal = arr.slice(1).filter(item => item.price === pivot.price);
    return [...dearSort(less), ...dearSort(equal), ...[pivot], ...dearSort(greater)];
  }
}

const inexpensiveSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const less = arr.slice(1).filter(item => item.price < pivot.price);
    const greater = arr.slice(1).filter(item => item.price > pivot.price);
    const equal = arr.slice(1).filter(item => item.price === pivot.price);
    return [...inexpensiveSort(less), ...inexpensiveSort(equal), ...[pivot], ...inexpensiveSort(greater)];
  }
}

const popularSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const less = arr.slice(1).filter(item => item.rating > pivot.rating);
    const greater = arr.slice(1).filter(item => item.rating < pivot.rating);
    const equal = arr.slice(1).filter(item => item.rating === pivot.rating);
    return [...popularSort(less), ...popularSort(equal), ...[pivot], ...popularSort(greater)];
  }
}

const newSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const less = arr.slice(1).filter(item => item.rating < pivot.rating);
    const greater = arr.slice(1).filter(item => item.rating > pivot.rating);
    const equal = arr.slice(1).filter(item => item.rating === pivot.rating);
    return [...newSort(less), ...newSort(equal), ...[pivot], ...newSort(greater)];
  }
}

export const getCatalogData = async (props) => {
  const { filters, sort} = props;
  const catalogData = await getAllCards();
  let sortedData = [];
  const newData = [];

  switch(sort) {
    case 'dear': sortedData = dearSort(catalogData);
      break;
    case 'inexpensive': sortedData = inexpensiveSort(catalogData);
      break;
    case 'popular': sortedData = popularSort(catalogData);
      break;
    case 'new': sortedData = newSort(catalogData);
      break;
    default: sortedData = catalogData;
  }

  console.log(sortedData);

  if (filters.length > 0) {
    sortedData.forEach(element => {
      let isIsset = false;
      for (const filter of filters) {
        isIsset = element.tags.includes(filter);
        if (isIsset) break;
      }
      if (isIsset) newData.push(element);
    });
    return newData;
  }
  return sortedData;
};
