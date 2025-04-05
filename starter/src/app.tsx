// import React, { useCallback, useState } from "react";
// import { createRoot } from "react-dom/client";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
//   MapCameraChangedEvent,
//   useMap,
// } from "@vis.gl/react-google-maps";

// type LatLng = google.maps.LatLngLiteral;
// type Poi = { key: string; name: string; location: LatLng };

// const defaultLocations: Poi[] = [
//   {
//     key: "griffith",
//     name: "Griffith Observatory",
//     location: { lat: 34.1184, lng: -118.3004 },
//   },
//   {
//     key: "grove",
//     name: "The Grove",
//     location: { lat: 34.0719, lng: -118.357 },
//   },
//   {
//     key: "smpier",
//     name: "Santa Monica Pier",
//     location: { lat: 34.0094, lng: -118.4973 },
//   },
//   {
//     key: "venice",
//     name: "Venice Beach",
//     location: { lat: 33.985, lng: -118.4695 },
//   },
// ];

// const PoiMarkers = ({
//   pois,
//   onSelect,
// }: {
//   pois: Poi[];
//   onSelect: (poi: Poi) => void;
// }) => (
//   <>
//     {pois.map((poi) => (
//       <AdvancedMarker
//         key={poi.key}
//         position={poi.location}
//         onClick={() => onSelect(poi)}
//         clickable
//       >
//         <Pin
//           background={poi.name === "Custom Pin" ? "#1D4ED8" : "#FBBC04"}
//           glyphColor="#000"
//           borderColor="#000"
//         />
//       </AdvancedMarker>
//     ))}
//   </>
// );

// const App = () => {
//   const map = useMap();
//   const [customMarkers, setCustomMarkers] = useState<Poi[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState<Poi | null>(null);

//   const handleMapClick = useCallback(
//     (event: any) => {
//       const { latLng } = event.detail;
//       if (!latLng || !map) return;

//       const clickedLocation = {
//         lat: latLng.lat,
//         lng: latLng.lng,
//       };

//       const service = new google.maps.places.PlacesService(map);

//       service.nearbySearch(
//         {
//           location: clickedLocation,
//           radius: 50,
//           type: "point_of_interest",
//         },
//         (results, status) => {
//           if (
//             status === google.maps.places.PlacesServiceStatus.OK &&
//             results &&
//             results.length > 0
//           ) {
//             const place = results[0];
//             console.log("place found:", place);
//             const marker = {
//               key: place.place_id!,
//               name: place.name || "Unnamed",
//               location: {
//                 lat: place.geometry!.location!.lat(),
//                 lng: place.geometry!.location!.lng(),
//               },
//             };
//             console.log("✅ Found place via nearbySearch:", marker);
//             setCustomMarkers((prev) => [...prev, marker]);
//             setSelectedLocation(marker);
//           } else {
//             fallbackToRawClick();
//           }
//         }
//       );

//       function fallbackToRawClick() {
//         const fallbackMarker = {
//           key: `user-${Date.now()}`,
//           name: "Custom Pin",
//           location: clickedLocation,
//         };
//         console.warn("⚠️ No place found. Adding fallback pin:", fallbackMarker);
//         setCustomMarkers((prev) => [...prev, fallbackMarker]);
//         setSelectedLocation(fallbackMarker);
//       }
//     },
//     [map]
//   );

//   const allLocations = [...defaultLocations, ...customMarkers];

//   return (
//     <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
//       <h1>📍 Explore LA</h1>
//       <Map
//         defaultZoom={12}
//         defaultCenter={{ lat: 34.0522, lng: -118.2437 }}
//         mapId="YOUR_MAP_ID_HERE"
//         onClick={handleMapClick}
//         onCameraChanged={(ev: MapCameraChangedEvent) =>
//           console.log(
//             "📷 Camera changed:",
//             ev.detail.center,
//             "zoom:",
//             ev.detail.zoom
//           )
//         }
//         style={{ height: "500px", width: "100%" }}
//       >
//         <PoiMarkers pois={allLocations} onSelect={setSelectedLocation} />
//       </Map>

//       {selectedLocation && (
//         <div
//           style={{
//             marginTop: "1rem",
//             background: "#f3f4f6",
//             padding: "1rem",
//             borderRadius: "8px",
//           }}
//         >
//           <h2>📌 Selected Location</h2>
//           <p>
//             <strong>{selectedLocation.name}</strong>
//           </p>
//           <p>Lat: {selectedLocation.location.lat.toFixed(5)}</p>
//           <p>Lng: {selectedLocation.location.lng.toFixed(5)}</p>
//         </div>
//       )}

//       <div style={{ marginTop: "2rem" }}>
//         <h2>📝 All Locations</h2>
//         <ul>
//           {allLocations.map((loc) => (
//             <li key={loc.key}>
//               {loc.name} ({loc.location.lat.toFixed(4)},{" "}
//               {loc.location.lng.toFixed(4)})
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const root = createRoot(document.getElementById("app")!);

// // Wrap in APIProvider at root
// root.render(
//   <APIProvider
//     apiKey="AIzaSyA7vBqqchdovNiMJaWqbjTLXiV_Q3LlyVQ"
//     libraries={["places"]}
//   >
//     <App />
//   </APIProvider>
// );
import React, { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";

type LatLng = google.maps.LatLngLiteral;

type Poi = {
  key: string;
  name: string;
  location: LatLng;
  rating?: number;
  types?: string[];
  photoUrl?: string;
  address?: string;
  businessStatus?: string;
};

const defaultLocations: Poi[] = [
  {
    key: "griffith",
    name: "Griffith Observatory",
    location: { lat: 34.1184, lng: -118.3004 },
  },
  {
    key: "grove",
    name: "The Grove",
    location: { lat: 34.0719, lng: -118.357 },
  },
  {
    key: "smpier",
    name: "Santa Monica Pier",
    location: { lat: 34.0094, lng: -118.4973 },
  },
  {
    key: "venice",
    name: "Venice Beach",
    location: { lat: 33.985, lng: -118.4695 },
  },
];

const PoiMarkers = ({
  pois,
  onSelect,
}: {
  pois: Poi[];
  onSelect: (poi: Poi) => void;
}) => (
  <>
    {pois.map((poi) => (
      <AdvancedMarker
        key={poi.key}
        position={poi.location}
        onClick={() => onSelect(poi)}
        clickable
      >
        <Pin
          background={poi.name === "Custom Pin" ? "#1D4ED8" : "#FBBC04"}
          glyphColor="#000"
          borderColor="#000"
        />
      </AdvancedMarker>
    ))}
  </>
);

const App = () => {
  const map = useMap();
  const [customMarkers, setCustomMarkers] = useState<Poi[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Poi | null>(null);

  const handleMapClick = useCallback(
    (event: any) => {
      const { latLng } = event.detail;
      if (!latLng || !map) return;

      const clickedLocation = {
        lat: latLng.lat,
        lng: latLng.lng,
      };

      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(
        {
          location: clickedLocation,
          radius: 50,
          type: "point_of_interest",
        },
        (results, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results &&
            results.length > 0
          ) {
            const place = results[0];
            const marker: Poi = {
              key: place.place_id!,
              name: place.name || "Unnamed",
              location: {
                lat: place.geometry!.location!.lat(),
                lng: place.geometry!.location!.lng(),
              },
              rating: place.rating,
              types: place.types,
              photoUrl: place.photos?.[0]?.getUrl({ maxWidth: 300 }),
              address: place.vicinity,
              businessStatus: place.business_status,
            };
            console.log("✅ Place found:", marker);
            setCustomMarkers((prev) => [...prev, marker]);
            setSelectedLocation(marker);
          } else {
            fallbackToRawClick();
          }
        }
      );

      function fallbackToRawClick() {
        const fallbackMarker: Poi = {
          key: `user-${Date.now()}`,
          name: "Custom Pin",
          location: clickedLocation,
        };
        console.warn("⚠️ No place found. Using fallback:", fallbackMarker);
        setCustomMarkers((prev) => [...prev, fallbackMarker]);
        setSelectedLocation(fallbackMarker);
      }
    },
    [map]
  );

  const allLocations = [...defaultLocations, ...customMarkers];

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>📍 Explore LA</h1>

      <Map
        defaultZoom={12}
        defaultCenter={{ lat: 34.0522, lng: -118.2437 }}
        mapId="YOUR_MAP_ID_HERE"
        onClick={handleMapClick}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            "📷 Camera moved:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
        style={{ height: "500px", width: "100%" }}
      >
        <PoiMarkers pois={allLocations} onSelect={setSelectedLocation} />
      </Map>

      {selectedLocation && (
        <div
          style={{
            marginTop: "1rem",
            background: "#f3f4f6",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h2>📌 Selected Location</h2>
          <p>
            <strong>{selectedLocation.name}</strong>
          </p>
          {selectedLocation.photoUrl && (
            <img
              src={selectedLocation.photoUrl}
              alt={selectedLocation.name}
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            />
          )}
          <p>📍 {selectedLocation.address || "No address available"}</p>
          <p>⭐ Rating: {selectedLocation.rating ?? "N/A"}</p>
          <p>🏷️ Types: {selectedLocation.types?.join(", ") || "N/A"}</p>
          <p>📊 Status: {selectedLocation.businessStatus || "N/A"}</p>
          <p>Lat: {selectedLocation.location.lat.toFixed(5)}</p>
          <p>Lng: {selectedLocation.location.lng.toFixed(5)}</p>
          <a
            href={`https://www.google.com/maps/place/?q=place_id:${selectedLocation.key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 View on Google Maps
          </a>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h2>📝 All Locations</h2>
        <ul>
          {allLocations.map((loc) => (
            <li key={loc.key}>
              {loc.name} ({loc.location.lat.toFixed(4)},{" "}
              {loc.location.lng.toFixed(4)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Render wrapped in APIProvider
const root = createRoot(document.getElementById("app")!);

root.render(
  <APIProvider
    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    libraries={["places"]}
  >
    <App />
  </APIProvider>
);
