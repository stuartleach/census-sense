import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {LatLngExpression} from "leaflet";
import {SearchResult} from "../shared/types/types";

interface MapProps {
  searchResults: SearchResult[];
}
/*

const MapComponent: React.FC<MapProps> = ({ searchResults }) => {
  const defaultCenter: LatLngExpression = [31.772543, -106.460953]; // Example center: San Francisco
  const defaultZoom = 12;

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '80vh', width: '80%' , margin: '0 auto'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {searchResults.map((result) => {
        // Add code here to convert the zip code to a latitude/longitude coordinate
        const position: LatLngExpression = [result.latitude, result.longitude];

        return (
          <Marker key={result.searchTerm} position={position}>
            <Popup>
              <strong>Zipcode:</strong> {result.searchTerm}<br />
              <strong>Population:</strong> {result.population}<br />
              <strong>Median Household Income:</strong> ${result.medianHouseholdIncome}<br />
              <strong>Median Age:</strong> {result.medianAge}<br />
              <strong>Average Home Value:</strong> ${result.averageHomeValue}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;*/
