import {createPopup} from './popup';

const addressElement = document.querySelector('#address');

const MAP_ZOOM = 12;

const CityCenter = {
  lat: 35.6895,
  lng: 139.692
};

const map = L.map('map-canvas');
const markerGroup = L.layerGroup();

const mainMarkerIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52]
  }
);

const markerIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  }
);

const mainMarker = L.marker(
  CityCenter,
  {
    draggable: true,
    icon: mainMarkerIcon
  }
);

const createMarker = ({author, offer, location}, icon) => {
  const {lat, lng} = location;
  const marker = L.marker(
    {
      lat,
      lng
    },
    {
      icon
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createPopup({author, offer}));
};

export const initMap = (cb) => {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  ).addTo(map);

  mainMarker.addTo(map);

  mainMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();

    addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

  map
    .on('load', cb)
    .setView(CityCenter, MAP_ZOOM);

  markerGroup.addTo(map);

  addressElement.value = `${CityCenter.lat}, ${CityCenter.lng}`;
};

export const resetMap = () => {
  map.setView(CityCenter, MAP_ZOOM);
  map.closePopup();
  mainMarker.setLatLng(CityCenter);
};

export const addMarkers = (offers) => {
  markerGroup.clearLayers();

  offers.forEach((offer) => createMarker(offer, markerIcon));
};
