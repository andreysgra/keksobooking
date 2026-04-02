import {disableForm, enableForm} from './utils';

const mapFiltersFormElement = document.querySelector('.map__filters');

export const disableMapFiltersForm = () => disableForm(mapFiltersFormElement, 'map__filters--disabled');

export const enableMapFilterForm = () => enableForm(mapFiltersFormElement, 'map__filters--disabled');
