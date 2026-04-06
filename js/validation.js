import {ErrorMessage, offerPriceMin, PRICE_MAX, RoomCapacity, TitleLength} from './const';

const adFormElement = document.querySelector('.ad-form');

const validateTitleLength = () =>
  adFormElement.title.value.length >= TitleLength.MIN && adFormElement.title.value.length <= TitleLength.MAX;

const validatePriceMin = (value) => value >= offerPriceMin[adFormElement.type.value];

const validatePriceMax = (value) => value <= PRICE_MAX;

const validateRoomCapacity = () =>
  RoomCapacity[adFormElement.rooms.value].includes(adFormElement.capacity.value);

const priceMinErrorMessage = `${ErrorMessage.PRICE_MIN_INVALID}${offerPriceMin[adFormElement.type.value]}`;
const priceMaxErrorMessage = `${ErrorMessage.PRICE_MAX_INVALID}${PRICE_MAX}`;

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
});

pristine.addValidator(adFormElement.title, validateTitleLength, ErrorMessage.TITLE_LENGTH_INVALID);
pristine.addValidator(adFormElement.price, validatePriceMin, priceMinErrorMessage);
pristine.addValidator(adFormElement.price, validatePriceMax, priceMaxErrorMessage);
pristine.addValidator(adFormElement.rooms, validateRoomCapacity, ErrorMessage.ROOM_CAPACITY_INVALID);
pristine.addValidator(adFormElement.capacity, validateRoomCapacity, ErrorMessage.ROOM_CAPACITY_INVALID);

export const setValidation = () => pristine.validate();
