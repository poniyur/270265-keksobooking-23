let latitude = 0;
let longitude = 0;
let zoom = 13;

let map = undefined;
let noticeLayer = undefined;
let mainMarkerLayer = undefined;

const TOKIYO_LAT = 35.68449;
const TOKIYO_LONG = 139.75124;


const config = {
  target: 'map-canvas',
  lat: TOKIYO_LAT,
  long:TOKIYO_LONG,

  markers: {
    main: {
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
      draggable: true,
      dragEndCallback: undefined,
      points: [
        {
          lat: TOKIYO_LAT,
          long: TOKIYO_LONG,
        },
      ],
    },
  },
};

const move = () => {
  map.setView([latitude, longitude], zoom);
};

const setPosition = (lat = latitude, long = longitude, _zoom = zoom) => {
  latitude = lat;
  longitude = long;
  zoom = _zoom;
  move();
};

const resetView = () => {
  setPosition(config.lat, config.long, config.zoom);
};

const createMarkers = (data) => {

  const group = L.layerGroup().addTo(map);

  const icon = L.icon({
    iconUrl: data.iconUrl,
    iconSize: data.iconSize,
    iconAnchor: data.iconAnchor,
  });

  const draggable = Boolean(data.draggable);

  if(data.points) {
    data.points.forEach((point) => {
      const marker = L.marker(
        L.latLng( point.lat, point.long),
        {
          draggable,
          icon,
        },
      );

      if( data.dragEndCallback ) {
        marker.on('dragend', () => {
          const latLng = marker.getLatLng();
          data.dragEndCallback(latLng.lat, latLng.lng);
        });
      }

      if( point.html ) {
        marker.bindPopup(point.html, {
          keepInView: true,
        });
      }
      marker.addTo(group);
    });
  }

  return group;
};

const createNoticeMarkers = (data) => {
  if( noticeLayer ) {
    map.removeLayer(noticeLayer);
  }
  noticeLayer = createMarkers({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    points: data,
  });

};

const createMainMarker = () => {
  if( mainMarkerLayer ) {
    map.removeLayer(mainMarkerLayer);
  }
  mainMarkerLayer = createMarkers(config.markers.main, true);
};

const resetMainMarker = () => {
  createMainMarker();
};

const createMap = (dragEndCallback) => {

  config.markers.main.dragEndCallback = dragEndCallback;

  map = L.map(config.target);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  resetView();
  createMainMarker();

};

export {createMap, createNoticeMarkers, resetMainMarker};
