// test map Id
// 5KVcmKsBa
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getResponses, pushResponse } from "../firebase/firebase";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

const MapPicker = ({ mapInfo }) => {
  const [map, setMap] = useState(null);
  const [mapPoints, setPoints] = useState([]);
  const mapContainer = useRef(null);

  const addResponsesToMap = async (map, excludeId) => {
    const points = await getResponses(mapInfo.mapId);
    const finalPoints = points.filter((point) => point.id !== excludeId);

    finalPoints.forEach((pt, i) => {
      setTimeout(() => {
        new mapboxgl.Marker().setLngLat([pt.location.lng, pt.location.lat]).addTo(map);
      }, i * 50);
    });
  };

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [mapInfo.mapProps.lng, mapInfo.mapProps.lat],
        zoom: mapInfo.mapProps.zoom,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      const onClick = (e) => {
        const popupContent = `<button id="confirmPoint" class="btn btn-primary btn-sm">Confirm</button>`;
        const popup = new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(popupContent).addTo(map);
        document.getElementById("confirmPoint").addEventListener("click", async () => {
          new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
          const excludeId = await pushResponse(mapInfo.mapId, e.lngLat);
          addResponsesToMap(map, excludeId);
          popup.remove();
        });
        map.off("click", onClick);
      };

      map.on("click", onClick);
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    // getResponses(mapInfo.mapId).then((points) => {
    //   setPoints([1, 2, 3, 4]);
    //   console.log("mappoints", mapPoints);
    // });
  }, []);

  return (
    <React.Fragment>
      <label htmlFor="map">Click somewhere on the map to submit your response:</label>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MapPicker;
