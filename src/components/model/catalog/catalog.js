export class CatalogModel {
  constructor(catalogData) {
    this._catalogData = catalogData;
    this._total = 0;
  }

  set catalogData(data) {
    this._catalogData = data;
  }

  get catalogData() {
    return this._catalogData;
  }

  dearSort(arr, param = 'ASC') {
    if (arr.length < 2) {
      return arr;
    } else {
      const pivot = arr[0];
      let less = null;
      let greater = null;

      if (param === 'ASC') {
        less = arr.slice(1).filter(item => item.price > pivot.price);
        greater = arr.slice(1).filter(item => item.price < pivot.price);
      } else if (param === 'DESC') {
        less = arr.slice(1).filter(item => item.price < pivot.price);
        greater = arr.slice(1).filter(item => item.price > pivot.price);
      }

      const equal = arr.slice(1).filter(item => item.price === pivot.price);
      return [...this.dearSort(less, param), ...this.dearSort(equal, param), ...[pivot], ...this.dearSort(greater, param)];
    }
  }

  popularSort(arr, param = 'ASC') {
    if (arr.length < 2) {
      return arr;
    } else {
      const pivot = arr[0];
      let less = null;
      let greater = null;

      if (param === 'ASC') {
        less = arr.slice(1).filter(item => item.rating > pivot.rating);
        greater = arr.slice(1).filter(item => item.rating < pivot.rating);
      } else if (param === 'DESC') {
        less = arr.slice(1).filter(item => item.rating < pivot.rating);
        greater = arr.slice(1).filter(item => item.rating > pivot.rating);
      }

      const equal = arr.slice(1).filter(item => item.rating === pivot.rating);
      return [...this.popularSort(less, param), ...this.popularSort(equal, param), ...[pivot], ...this.popularSort(greater, param)];
    }
  }

  async catalogFilterAndSort(props) {
    const { filters, sort  } = props;
    let sortedData = [];
    const newData = [];

    switch(sort) {
      case 'dear': sortedData = this.dearSort(this._catalogData, 'ASC');
        break;
      case 'inexpensive': sortedData = this.dearSort(this._catalogData, 'DESC');
        break;
      case 'popular': sortedData = this.popularSort(this._catalogData, 'ASC');
        break;
      case 'new': sortedData = this.popularSort(this._catalogData, 'DESC');
        break;
      default: sortedData = this._catalogData;
    }

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
  }
}