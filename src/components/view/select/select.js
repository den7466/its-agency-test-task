const closeAllSelect = (element) => {
  const selects = document.querySelectorAll('.custom-select__items');
  const buttons = document.querySelectorAll('.custom-select_selected');

  selects.forEach((item) => {
    if (element !== item.previousElementSibling) {
      item.classList.add('custom-select_hide');
    }
  });

  buttons.forEach((button) => {
    if (element !== button) {
      button.classList.remove('custom-select__arrow_active');
    }
  });
};

export const customSelectInit = (selectHandler) => {
  const customSelect = document.querySelector('.custom-select');
  const selected = customSelect.querySelector('.custom-select_selected');
  const items = customSelect.querySelector('.custom-select__items');
  const options = items.querySelectorAll('div');

  // Открытие/закрытие списка
  selected.addEventListener('click', function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    items.classList.toggle('custom-select_hide');
    this.classList.toggle('custom-select__arrow_active');
  });

  // Выбор варианта
  options.forEach((option) => {
    option.addEventListener('click', function () {
      // Удаляем выделение у всех вариантов
      options.forEach((opt) =>
        opt.classList.remove('custom-select__same-as-selected')
      );

      // Устанавливаем выбранный вариант
      selected.textContent = this.textContent;
      selected.dataset.selected = this.dataset.value;
      this.classList.add('custom-select__same-as-selected');
      selectHandler(selected.dataset.selected);

      // Закрываем список
      items.classList.add('custom-select_hide');
      selected.classList.remove('custom-select__arrow_active');
    });
  });
  // Закрытие всех select при клике вне их
  document.addEventListener('click', closeAllSelect);
};