import {
  addLeadZero,
  getRandomArrayElement,
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  shuffleArray
} from './utils';

const AVATAR_MIN_NUMBER = 1;
const AVATAR_MAX_NUMBER = 10;
const PRICE_MIN = 20000;
const PRICE_MAX = 100000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 6;
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;
const LAT_MIN = 35.65;
const LAT_MAX = 35.7;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_LIST = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const TITLES = [
  'Маленькая квартирка рядом с парком',
  'Уютное гнездышко для молодоженов',
  'Тихая квартирка недалеко от метро',
  'Стандартная квартира в центре',
  'Квартира студия в престижном районе',
  'Милое гнездышко для фанатов Анимэ',
  'Императорский дворец в центре Токио'
];

const ADDRESSES = [
  '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
  'Chiyoda-ku, Tōkyō-to 102-0082',
  '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 17−4',
  '102-0081 Tōkyō-to, Chiyoda-ku, Yonbanchō, 5−6',
  '102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3',
  '102-0080 Tōkyō-to, Chiyoda-ku, 14-7'
];

const DESCRIPTIONS = [
  'Отель для ценителей истории. Почувствуй себя героем из прошлого.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'Великолепная квартира-студия в центре Токио. Подходит как туристам, там и бизнесменам. Квартира полностью укомплектована и имеет свежий ремонт.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/scott-webb-1ddol8rgUH8.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/andrea-davis-7Wg_9Dq17_U.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/andrea-davis-8xT51zPdsjY.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/andrea-davis-nbI8gqbBaHo.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/greg-rosenke-HHgnQFBVs6o.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/ducminh-nguyen-hG3H6N6VwCY.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/erik-mclean-1H_tipvmM60.jpg'
];

const createAuthor = () => {
  const avatarNumber = getRandomPositiveInteger(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER);

  return {
    avatar: `img/avatars/user${addLeadZero(avatarNumber)}.png`
  };
};

const createOffer = () => {
  const features = shuffleArray(FEATURES);
  const photos = shuffleArray(PHOTOS);

  return {
    title: getRandomArrayElement(TITLES),
    address: getRandomArrayElement(ADDRESSES),
    price: getRandomPositiveInteger(PRICE_MIN, PRICE_MAX),
    type: getRandomArrayElement(OFFER_TYPES),
    rooms: getRandomPositiveInteger(ROOMS_MIN, ROOMS_MAX),
    guests: getRandomPositiveInteger(GUESTS_MIN, GUESTS_MAX),
    checkin: getRandomArrayElement(CHECKIN_LIST),
    checkout: getRandomArrayElement(CHECKIN_LIST),
    features: features.slice(0, getRandomPositiveInteger(0, features.length)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: photos.slice(0, getRandomPositiveInteger(1, photos.length))
  };
};

const createLocation = () => ({
  lat: getRandomPositiveFloat(LAT_MIN, LAT_MAX, 5),
  lng: getRandomPositiveFloat(LNG_MIN, LNG_MAX, 5)
});

const createPlace = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation()
});

export const getOffers = (count) => Array.from({length: count}, () => createPlace());
