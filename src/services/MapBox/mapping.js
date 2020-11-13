import mapboxgl, { LngLat } from "mapbox-gl";
import { getResponses, pushResponse, updateResponse } from "../../firebase/responses/responses";
import { buildPolygonFromBounds } from "../../utils/geometry";

// User generated marker representing poll response
export class YouMarker extends mapboxgl.Marker {
  constructor(mapId, lngLat, name) {
    super({
      color: "#C00",
      draggable: true,
    });

    this.setLngLat(lngLat);
    this.setPopup(new mapboxgl.Popup().setHTML(name ? name : "<i>Your Response (Anonymous)</i>"));
    this.mapId = mapId;
    const youMarkerDiv = this.getElement();
    youMarkerDiv.addEventListener("mouseenter", () => this.togglePopup());
    youMarkerDiv.addEventListener("mouseleave", () => this.togglePopup());

    this.on("dragend", () => {
      updateResponse(mapId, this.getLngLat(), this.key);
    });
  }
}

// Marker representing other responses
export class ResponseMarker extends mapboxgl.Marker {
  constructor(lngLat, name) {
    super();
    this.setLngLat(lngLat);
    this.setPopup(new mapboxgl.Popup().setHTML(name ? name : "<i>(Anonymous)</i>"));

    const responseMarkerDiv = this.getElement();
    responseMarkerDiv.addEventListener("mouseenter", () => this.togglePopup());
    responseMarkerDiv.addEventListener("mouseleave", () => this.togglePopup());
  }
}

// Map object for submitting responses in MapPicker
export class MapPollPicker extends mapboxgl.Map {
  constructor(container, mapId, setResultsReady) {
    super({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
    });

    const dropMarker = async ({ lngLat }) => {
      const ym = new YouMarker(mapId, lngLat, this.name);
      this.excludeKey = await pushResponse(mapId, lngLat, this.name);
      ym.addTo(this);
      ym.key = this.excludeKey;
      setResultsReady(true);
      this.off("click", dropMarker);
    };

    this.setLocation = ({ lat, lng, zoom }) => {
      this.setZoom(zoom);
      this.setCenter([lng, lat]);
    };

    this.setName = (name) => (this.name = name);

    this.addResponses = async (mapId) => {
      const points = await getResponses(mapId);
      const displayPoints = points.filter((point) => point.id !== this.excludeKey);
      displayPoints.forEach((pt, i) => {
        setTimeout(() => {
          const newMarker = new ResponseMarker(
            {
              lng: pt.location.lng,
              lat: pt.location.lat,
            },
            pt.name
          );

          newMarker.addTo(this);
        }, i * 50);
      });

      return points.length;
    };

    this.on("click", dropMarker);
    this.on("mouseover", () => (this.getCanvas().style.cursor = "pointer"));
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
