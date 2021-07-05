let startLat = 0;
let startLong = 0;
let startZoom = 0;

let latitude = 0;
let longitude = 0;
let zoom = 13;

let map = undefined;

const markerGroups = {};
const markers = {};

const createMap = (id) => {
  const _map = L.map(id);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(_map);
  return _map;
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
  setPosition(startLat, startLong, startZoom);
};


const init = (config = {}) => {

  map = createMap(config.target);

  setPosition(config.lat, config.long, config.zoom);


  startLat = latitude;
  startLong = longitude;
  startZoom = zoom;

  if( config.markers ) {
    for( const markerGroup in config.markers ) {

      const groupData = config.markers[markerGroup];
      const group = markerGroups[markerGroup]  = L.layerGroup().addTo(map);
      markers[markerGroup] = {};

      const icon = L.icon({
        iconUrl: groupData.iconUrl,
        iconSize: groupData.iconSize,
        iconAnchor: groupData.iconAnchor,
      });

      const draggable = Boolean(groupData.draggable);

      if(groupData.points) {
        groupData.points.forEach((point) => {
          const marker = markers[markerGroup][point.id] = L.marker(
            {
              lat: point.lat,
              lng: point.long,
            },
            {
              draggable,
              icon,
            },
          );

          if( groupData.dragEndCallback ) {
            marker.on('dragend', () => {
              groupData.dragEndCallback(marker._latlng.lat, marker._latlng.lng);
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
    }
  }

  if( config.callback ) {
    config.callback();
  }
};


export {init, resetView};
