import {disableAdForm, enableAdForm} from './ad-form.js';
import {addMarkers, initMap} from './map.js';
import {disableMapFiltersForm, enableMapFilterForm, setFilters} from './map-filters-form.js';
import {getData} from './api.js';
import {loadFailMessage} from './messages.js';
import {OFFERS_MAX_COUNT} from './const.js';
import {debounce} from './utils.js';

disableMapFiltersForm();
disableAdForm();

const onLoadSuccess = (offers) => {
  addMarkers(offers.slice(0, OFFERS_MAX_COUNT));
  setFilters(offers, debounce(addMarkers));
  enableMapFilterForm();
};

initMap(() => {
  getData(onLoadSuccess, loadFailMessage)
    .then(enableAdForm);
});
