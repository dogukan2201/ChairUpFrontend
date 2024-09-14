import React, { useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Card from "antd/lib/card/Card";

const containerStyle = {
  width: "700px",
  height: "700px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
const GoogleMaps: React.FC = () => {
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  console.log("map", map);

  return (
    <Card style={{ height: "100%" }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      ) : (
        <>Google Maps Server Error</>
      )}
    </Card>
  );
};

export default memo(GoogleMaps);
