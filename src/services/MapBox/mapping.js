import mapboxgl from "mapbox-gl";

// User generated marker representing poll response
export class youMarker extends mapboxgl.Marker {
  constructor(lngLat, mapId) {
    super({
      color: "#C00",
      draggable: true,
    });
    this.setLngLat(lngLat);
    this.mapId = mapId;
  }
}
