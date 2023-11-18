import { React, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import aqi from "../Service/aqi";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

const { BaseLayer } = LayersControl;

function LocateUser() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius, {
        color: "#fc4332",
        stroke: false,
        opacity: 0.3,
      });
      circle.addTo(map);
    });
  }, [map]);
  aqi();

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        You are here. <br />
        Your latitude is {position.lat} <br />
        Your longitude is {position.lng}
      </Popup>
    </Marker>
  );
}

function leafletMap() {
  return (
    <MapContainer
      center={[-6.3343, 106.8373]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
    >
      <LayersControl>
        <BaseLayer checked name="OSM">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        <BaseLayer name="Google Sattelite">
          <TileLayer url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}" />
        </BaseLayer>
      </LayersControl>
      <LocateUser />
    </MapContainer>
  );
}

export default leafletMap;
