import { map } from "jquery";
import mapboxgl from "mapbox-gl";
import { pushResponse, updateResponse } from "../../firebase/responses/responses";
import { buildPolygonFromBounds } from "../../utils/geometry";

// User generated marker representing poll response
export class YouMarker extends mapboxgl.Marker {
  constructor(mapId, lngLat) {
    super({
      color: "#C00",
      draggable: true,
    });

    this.setLngLat(lngLat);
    this.setPopup(new mapboxgl.Popup().setHTML("<i>Your Response</i>"));
    this.mapId = mapId;
    this.key = pushResponse(mapId, lngLat).then((key) => (this.key = key));

    const youMarkerDiv = this.getElement();
    youMarkerDiv.addEventListener("mouseenter", () => this.togglePopup());
    youMarkerDiv.addEventListener("mouseleave", () => this.togglePopup());

    this.on("dragend", () => {
      updateResponse(mapId, this.getLngLat(), this.key);
    });
  }
}

// Map object for building map poll in MapBuilder
export class MapPollBuilder extends mapboxgl.Map {
  constructor(container, mapLocation, handleMapMove) {
    super({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapLocation.lng, mapLocation.lat],
      zoom: mapLocation.zoom,
    });

    this.on("moveend", () => {
      handleMapMove({
        lng: parseFloat(this.getCenter().lng.toFixed(4)),
        lat: parseFloat(this.getCenter().lat.toFixed(4)),
        zoom: parseFloat(this.getZoom().toFixed(2)),
      });
    });

    this.toggleBoundary = () => {
      if (this.getLayer("extent")) {
        this.removeLayer("extent");
        this.removeSource("extent");
        return;
      }

      if (this.loaded()) {
        this.addLayer({
          id: "extent",
          type: "line",
          source: buildPolygonFromBounds(this.getBounds()),
          paint: {
            "line-width": 3,
            "line-color": "#C00",
          },
        });
      }
    };
  }
}

// Map object for submitting responses in MapPicker
export class MapPollPicker extends mapboxgl.Map {
  constructor(container, mapId, mapLocation, setResultsReady) {
    super({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapLocation.lng, mapLocation.lat],
      zoom: mapLocation.zoom,
    });

    const dropMarker = ({ lngLat }) => {
      const ym = new YouMarker(mapId, lngLat);
      ym.addTo(this);
      setResultsReady(true);
      this.off("click", dropMarker);
    };

    this.on("click", dropMarker);
    this.on("mouseover", () => (this.getCanvas().style.cursor = "pointer"));
  }
}
