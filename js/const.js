export const offerType = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец'
};

export const offerPriceMin = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

export const TitleLength = {
  MIN: 30,
  MAX: 100
};

export const RoomCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

export const Price = {
  MIN: 0,
  MAX: 100000
};

export const ErrorMessage = {
  TITLE_LENGTH_INVALID: 'Название должно содержать не менее 30 и не более 100 символов',
  PRICE_MIN_INVALID: 'Стоимость должна быть не меньше ',
  PRICE_MAX_INVALID: 'Стоимость должна быть не больше ',
  ROOM_CAPACITY_INVALID: 'Превышено количество гостей'
};
