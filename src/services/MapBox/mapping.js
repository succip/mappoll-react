import mapboxgl from "mapbox-gl";
import { pushResponse, updateResponse } from "../../firebase/firebase";

// User generated marker representing poll response
export class youMarker extends mapboxgl.Marker {
  constructor(lngLat, mapId) {
    super({
      color: "#C00",
      draggable: true,
    });
    this.setLngLat(lngLat);
    this.mapId = mapId;
    this.key = pushResponse(mapId, lngLat).then((key) => (this.key = key));

    this.on("dragend", () => {
      updateResponse(mapId, this.getLngLat(), this.key);
    });
  }
}
