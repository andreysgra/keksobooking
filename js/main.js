import {disableAdForm, enableAdForm} from './ad-form';
import {addMarkers, initMap} from './map';
import {disableMapFiltersForm, enableMapFilterForm} from './map-filters-form';
import {getData} from './api';
import {loadFailMessage} from './messages';
import {OFFERS_MAX_COUNT} from './const';

disableMapFiltersForm();
disableAdForm();

const onLoadSuccess = (data) => {
  const offers = data.slice(0, OFFERS_MAX_COUNT);

  addMarkers(offers);
  enableMapFilterForm();
};

initMap(() => {
  getData(onLoadSuccess, loadFailMessage)
    .then(enableAdForm);
});
