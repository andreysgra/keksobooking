import {offerType} from './const';
import {getPlural} from './utils';

const popupElement = document.querySelector('#card').content.querySelector('.popup');

export const createPopup = (similarOffer) => {
  const {author, offer} = similarOffer;

  const flatFormattedText = getPlural(offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guestFormattedText = getPlural(offer.guests, ['гостя', 'гостей', 'гостей']);

  const element = popupElement.cloneNode(true);

  const featureList = element.querySelectorAll('.popup__feature');
  const popupDescriptionElement = element.querySelector('.popup__description');
  const popupPhotoElement = element.querySelector('.popup__photo');

  const photosFragment = document.createDocumentFragment();

  element.querySelector('.popup__avatar').src = author.avatar;
  element.querySelector('.popup__title').textContent = offer.title;
  element.querySelector('.popup__text--address').textContent = offer.address;
  element.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  element.querySelector('.popup__type').textContent = offerType[offer.type];
  element.querySelector('.popup__text--capacity').textContent =
    `${offer.rooms} ${flatFormattedText} для ${offer.guests} ${guestFormattedText}`;
  element.querySelector('.popup__text--time').textContent =
    `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.features.length > 0) {
    featureList.forEach((featureItem) => {
      const isFeatureExist = offer.features.some((feature) =>
        featureItem.classList.contains(`popup__feature--${feature}`));

      if (!isFeatureExist) {
        featureItem.remove();
      }
    });
  }

  if (offer.description) {
    popupDescriptionElement.textContent = offer.description;
  } else {
    popupDescriptionElement.remove();
  }

  offer.photos.forEach((photo) => {
    const popupPhotoNode = popupPhotoElement.cloneNode();

    popupPhotoNode.src = photo;
    photosFragment.append(popupPhotoNode);
  });

  popupPhotoElement.remove();
  element.querySelector('.popup__photos').append(photosFragment);

  return element;
};
