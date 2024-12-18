import L from "leaflet";

const redIcon = L.icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41], // Default Leaflet marker size
    iconAnchor: [12, 41], // Point of the marker icon
    popupAnchor: [1, -34], // Point of the popup relative to the icon
    shadowSize: [41, 41], // Shadow size
});
export default redIcon;
