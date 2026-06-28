import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

import Sidebar from "../Sidebar";
import Header from "../Header";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Verified (Green)
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Pending (Yellow)
const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Rejected (Red)
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Select marker based on status
const getMarkerIcon = (status) => {
  switch (status) {
    case "Verified":
      return greenIcon;

    case "Rejected":
      return redIcon;

    default:
      return yellowIcon;
  }
};

export default function CommunityMapLayout() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        const data = [];

        snapshot.forEach((doc) => {
          const report = doc.data();

          if (report.latitude && report.longitude) {
            data.push({
              id: doc.id,
              ...report,
            });
          }
        });

        setReports(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0D1117] text-white">

      <Sidebar />

      <main className="flex-1 overflow-auto">

        <Header />

        <div className="p-8">

          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              Community Waste Map
            </h1>

            <p className="mt-2 text-gray-400">
              Live locations of reported waste across the campus.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#30363D]">

            <MapContainer
              center={[12.8406, 80.1534]}
              zoom={15}
              style={{
                height: "700px",
                width: "100%",
              }}
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {reports.map((report) => (
                <Marker
                  key={report.id}
                  position={[
                    report.latitude,
                    report.longitude,
                  ]}
                  icon={getMarkerIcon(report.status)}
                >
                  <Popup>

                    <div className="space-y-2">

                      <h3 className="text-lg font-bold">
                        {report.category}
                      </h3>

                      <p>
                        <strong>Weight:</strong>{" "}
                        {report.weight} kg
                      </p>

                      <p>
                        <strong>Community:</strong>{" "}
                        {report.community}
                      </p>

                      <p>
                        <strong>Reported By:</strong>{" "}
                        {report.userName}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        {report.status}
                      </p>

                    </div>

                  </Popup>
                </Marker>
              ))}

            </MapContainer>

          </div>

        </div>

      </main>

    </div>
  );
}