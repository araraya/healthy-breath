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
import * as turf from "@turf/turf";

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

function LeafletMap() {
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

      <UserMarker />
    </MapContainer>
  );
}

function UserMarker() {
  const [position, setPosition] = useState(null);
  const [randomPoints, setRandomPoints] = useState([]);
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const mapBounds = map.getBounds();
      console.log(mapBounds);
      const currentBbox = [
        mapBounds.getNorthEast().lat,
        mapBounds.getSouthWest().lng,
        mapBounds.getSouthWest().lat,
        mapBounds.getNorthEast().lng,
      ];
      console.log(currentBbox);
      const randomPointsBbox = turf.randomPoint(25, { bbox: currentBbox });
      const positionPoint = turf.point([e.latlng.lng, e.latlng.lat]);
      console.log(positionPoint);
      console.log(randomPointsBbox);
      setRandomPoints((r) => [...randomPoints, ...randomPointsBbox.features]);
      console.log(randomPoints);
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius, {
        color: "#fc4332",
        stroke: false,
        opacity: 0.3,
      });
      circle.addTo(map);

      const allCoordinates = [...randomPointsBbox.features];
      allCoordinates.push(positionPoint);
      console.log(allCoordinates);
      aqi(allCoordinates);
    });
  }, [map]);
  if (position && randomPoints) {
    return (
      <>
        <Marker position={position}>
          <Popup>
            You are here. <br />
            Your latitude is {position.lat} <br />
            Your longitude is {position.lng}
          </Popup>
        </Marker>

        <RandomPoints randomPoints={randomPoints} />
      </>
    );
  }
}

function RandomPoints({ randomPoints }) {
  return randomPoints.map((rand, i) => {
    const latlng = {
      lat: rand.geometry.coordinates[0],
      lng: rand.geometry.coordinates[1],
    };
    const id = i + 1;
    return (
      <Marker position={latlng} key={id}>
        {" "}
      </Marker>
    );
  });
}
export default LeafletMap;
