import {getOffers} from './data';
import {createPopup} from './popup';
import {enableAdForm} from './ad-form';

const OFFERS_COUNT = 10;
const offers = getOffers(OFFERS_COUNT);

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.append(createPopup(offers[0]));

enableAdForm();
