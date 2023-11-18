import React from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  LayersControl,
} from "react-leaflet";

const { BaseLayer } = LayersControl;

function leafletMap(){
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
    
    </MapContainer>
  );
}

export default leafletMap;