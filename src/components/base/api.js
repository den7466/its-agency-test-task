export const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

export const getAllCards = async () => {
  return await fetch(`https://68762654814c0dfa653ae27f.mockapi.io/api/v1/goods/`).then(handleResponse);
}