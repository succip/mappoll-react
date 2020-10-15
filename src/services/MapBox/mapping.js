import mapboxgl from "mapbox-gl";

// User generated marker that submits poll response
export class youMarker extends mapboxgl.Marker {
  constructor(lngLat, mapId) {
    super({
      color: "#C00",
      draggable: true,
    });
    this.setLngLat(lngLat);
    this.mapId = mapId;
    this.on("dragend", () => {
      console.log("drag ended");
    });
  }
}
