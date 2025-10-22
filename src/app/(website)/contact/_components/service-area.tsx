"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
type IconDefaultPrototype = { _getIconUrl?: () => string | void };
delete (L.Icon.Default.prototype as unknown as IconDefaultPrototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ServiceArea = () => {
  const position: [number, number] = [23.8103, 90.4125];

  return (
    <div className="">
      <div className="text-center mb-10">
        <h1 className="text-3xl text-primary font-semibold">Service Area</h1>
        <p className="mt-2 text-gray-600">
          Your Trusted Service, Wherever You Are
        </p>
      </div>

      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>We serve this area!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceArea;
