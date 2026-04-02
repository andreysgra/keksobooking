import {disableForm, enableForm} from './utils';

const adFormElement = document.querySelector('.ad-form');

export const disableAdForm = () => disableForm(adFormElement, 'ad-form--disabled');

export const enableAdForm = () => enableForm(adFormElement, 'ad-form--disabled');
