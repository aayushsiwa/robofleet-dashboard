import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import greenIcon from "./greenIcon";
import redIcon from "./redIcon";

function MapView({ robots }) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden 
bg-slate-900/40 backdrop-blur-xl"
    >
      <MapContainer
        className="w-full h-full"
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
      >
        {/* Dark Theme Map */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {robots.map((robot) => (
          <Marker
            key={robot["Robot ID"]}
            position={robot["Location Coordinates"]}
            icon={robot["Online/Offline"] ? greenIcon : redIcon}
          >
            {/* Clean Minimal Tooltip */}
            <Tooltip
              direction="top"
              offset={[0, -12]}
              opacity={1}
              className="!bg-slate-900 !text-white !border !border-slate-700 !shadow-lg"
            >
              <div className="text-xs">🔋 {robot["Battery Percentage"]}%</div>
            </Tooltip>

            {/* Premium Styled Popup */}
            <Popup>
              <div className="text-sm space-y-2 text-slate-800">
                <div className="font-semibold text-base">
                  Robot {robot["Robot ID"]}
                </div>

                <div className="flex justify-between">
                  <span>Status</span>
                  <span
                    className={`font-medium ${
                      robot["Online/Offline"]
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {robot["Online/Offline"] ? "Online" : "Offline"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Battery</span>
                  <span>{robot["Battery Percentage"]}%</span>
                </div>

                <div className="flex justify-between">
                  <span>CPU</span>
                  <span>{robot["CPU Usage"]}%</span>
                </div>

                <div className="flex justify-between">
                  <span>RAM</span>
                  <span>{robot["RAM Consumption"]}MB</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
