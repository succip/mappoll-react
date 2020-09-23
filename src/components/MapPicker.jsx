// test map Id
// 5KVcmKsBa
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getResponses, pushResponse } from "../firebase/firebase";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

const MapPicker = ({ mapInfo }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const addResponsesToMap = async (map, excludeId) => {
    const points = await getResponses(mapInfo.mapId);
    const displayPoints = points.filter((point) => point.id !== excludeId);

    displayPoints.forEach((pt, i) => {
      setTimeout(() => {
        const responseMarker = new mapboxgl.Marker()
          .setLngLat([pt.location.lng, pt.location.lat])
          .setPopup(new mapboxgl.Popup().setHTML(pt.name || "<em>Anonymous</em>"));
        const responseMarkerDiv = responseMarker.getElement();

        responseMarkerDiv.addEventListener("mouseenter", () => {
          responseMarker.togglePopup();
        });

        responseMarkerDiv.addEventListener("mouseleave", () => {
          responseMarker.togglePopup();
        });

        responseMarker.addTo(map);
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
          const youMarker = new mapboxgl.Marker({
            color: "#e66a6a",
          })
            .setLngLat(e.lngLat)
            .setPopup(new mapboxgl.Popup().setHTML("You"))
            .addTo(map);
          const youMarkerDiv = youMarker.getElement();

          youMarkerDiv.addEventListener("mouseenter", () => {
            youMarker.togglePopup();
          });

          youMarkerDiv.addEventListener("mouseleave", () => {
            youMarker.togglePopup();
          });

          const name = document.getElementById("name").value;
          const excludeId = await pushResponse(mapInfo.mapId, e.lngLat, name);
          addResponsesToMap(map, excludeId);
          popup.remove();
          map.off("click", onClick);
        });
      };

      map.on("click", onClick);
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 mb-3 form-group">
            <label htmlFor="name">Your Name:</label>
            {/* <input id="name" type="text" className="form-control form-control-sm" autoComplete="off" placeholder="Anonymous" /> */}
            <input id="name" type="text" className="form-control form-control-sm" autoComplete="off" placeholder="Anonymous" />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10">
            <label htmlFor="map">Click somewhere on the map to submit your response:</label>
            <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MapPicker;
