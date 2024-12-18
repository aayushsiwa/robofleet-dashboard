import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import greenIcon from "./greenIcon";
import redIcon from "./redIcon";

function MapView({ robots }) {
    return (
        <div className="w-1/2 mt-[10%] h-full">
            <MapContainer className="w-full h-96" center={[0, 0]} zoom={1}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {robots.map((robot) => (
                    <Marker
                        key={robot["Robot ID"]}
                        position={robot["Location Coordinates"]}
                        icon={robot["Online/Offline"] ? greenIcon : redIcon}
                        
                    >
                        <Tooltip>
                            <span>Battery: {robot["Battery Percentage"]}%</span>
                            <br />
                        </Tooltip>
                        <Popup>
                            <b>ID:</b> {robot["Robot ID"]}
                            <br />
                            <b>Battery:</b> {robot["Battery Percentage"]}%<br />
                            <b>Status:</b>{" "}
                            {robot["Online/Offline"] ? "Online" : "Offline"}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapView;
