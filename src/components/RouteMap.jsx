import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function getCenter(route, stops) {
  if (route?.coordinates?.length) {
    const first = route.coordinates[0];
    return [first.lat, first.lng];
  }
  if (stops?.length && stops[0].coordinate) {
    return [stops[0].coordinate.lat, stops[0].coordinate.lng];
  }
  return [39.5, -98.35];
}

export default function RouteMap({ route, stops }) {
  const polyline = route?.coordinates?.map((item) => [item.lat, item.lng]) || [];
  const center = getCenter(route, stops);

  return (
    <div className="map-shell">
      <MapContainer center={center} zoom={5} scrollWheelZoom style={{ height: "440px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {polyline.length > 1 ? <Polyline positions={polyline} /> : null}

        {stops
          .filter((stop) => stop.coordinate)
          .map((stop, index) => (
            <Marker
              key={`${stop.type}-${index}-${stop.start}`}
              position={[stop.coordinate.lat, stop.coordinate.lng]}
              icon={markerIcon}
            >
              <Popup>
                <strong>{stop.label}</strong>
                <br />
                {stop.location}
                <br />
                {new Date(stop.start).toLocaleString()}
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <div className="map-meta">
        <div>
          <small>Distance</small>
          <strong>{route ? `${route.distance_miles.toFixed(1)} miles` : "-"}</strong>
        </div>
        <div>
          <small>Base route time</small>
          <strong>{route ? `${route.duration_hours.toFixed(2)} hours` : "-"}</strong>
        </div>
      </div>
    </div>
  );
}
