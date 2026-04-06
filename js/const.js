export const offerType = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец'
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

export const PRICE_MAX = 100000;

export const ErrorMessage = {
  TITLE_LENGTH_INVALID: 'Название должно содержать не менее 30 и не более 100 символов',
  PRICE_MAX_INVALID: 'Стоимость не должна быть больше 100 000',
  ROOM_CAPACITY_INVALID: 'Превышено количество гостей'
};
