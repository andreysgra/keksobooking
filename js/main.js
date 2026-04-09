import {disableAdForm, enableAdForm} from './ad-form';
import {addMarkers, initMap} from './map';
import {disableMapFiltersForm, enableMapFilterForm, setFilters} from './map-filters-form';
import {getData} from './api';
import {loadFailMessage} from './messages';
import {OFFERS_MAX_COUNT} from './const';

disableMapFiltersForm();
disableAdForm();

const onLoadSuccess = (offers) => {
  addMarkers(offers.slice(0, OFFERS_MAX_COUNT));
  setFilters(offers, addMarkers);
  enableMapFilterForm();
};

initMap(() => {
  getData(onLoadSuccess, loadFailMessage)
    .then(enableAdForm);
});
