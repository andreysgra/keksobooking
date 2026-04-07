import {getOffers} from './data';
import {disableAdForm, enableAdForm} from './ad-form';
import {addMarkers, initMap} from './map';
import {disableMapFiltersForm, enableMapFilterForm} from './map-filters-form';

const OFFERS_COUNT = 10;
const offers = getOffers(OFFERS_COUNT);

disableMapFiltersForm();
disableAdForm();

initMap(() => {
  enableAdForm();
  addMarkers(offers);
  enableMapFilterForm();
});


