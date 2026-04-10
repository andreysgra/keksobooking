import {disableForm, enableForm} from './utils.js';
import {OFFERS_MAX_COUNT} from './const.js';
import {addMarkers} from './map';

const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersFormElement.querySelector('#housing-type');
const housingRoomsElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingPriceElement = mapFiltersFormElement.querySelector('#housing-price');
const housingGuestsElement = mapFiltersFormElement.querySelector('#housing-guests');

const DEFAULT_VALUE = 'any';

const HousingPrice = {
  low: {
    MIN: 0,
    MAX: 10000
  },
  middle: {
    MIN: 10000,
    MAX: 50000
  },
  high: {
    MIN: 50000,
    MAX: Infinity
  }
};

const filterByType = ({offer}) => housingTypeElement.value === DEFAULT_VALUE || housingTypeElement.value === offer.type;

const filterByRooms = ({offer}) =>
  housingRoomsElement.value === DEFAULT_VALUE || Number(housingRoomsElement.value) === offer.rooms;

const filterByPrice = ({offer}) =>
  housingPriceElement.value === DEFAULT_VALUE ||
  offer.price >= HousingPrice[housingPriceElement.value].MIN &&
  offer.price <= HousingPrice[housingPriceElement.value].MAX;

const filterByGuests = ({offer}) => housingGuestsElement.value === DEFAULT_VALUE ||
  Number(housingGuestsElement.value) === offer.guests;

const filterByFeatures = ({offer}) => {
  const features = [...mapFiltersFormElement.features]
    .filter((feature) => feature.checked)
    .map((checkbox) => checkbox.value);

  if (!features.length) {
    return true;
  }

  if (!offer.features) {
    return false;
  }

  return features.every((feature) => offer.features.includes(feature));
};

const getFilteredOffers = (offers) => offers.filter((offer) =>
  filterByType(offer) && filterByRooms(offer) && filterByPrice(offer) &&
  filterByGuests(offer) && filterByFeatures(offer));

export const disableMapFiltersForm = () => disableForm(mapFiltersFormElement, 'map__filters--disabled');

export const enableMapFilterForm = () => enableForm(mapFiltersFormElement, 'map__filters--disabled');

export const setFilters = (offers, cb) => {
  addMarkers(offers.slice(0, OFFERS_MAX_COUNT));

  mapFiltersFormElement.addEventListener('change', () => {
    cb(getFilteredOffers(offers).slice(0, OFFERS_MAX_COUNT));
  });
};
