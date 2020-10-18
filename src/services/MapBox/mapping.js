import mapboxgl from "mapbox-gl";
import { pushResponse, updateResponse } from "../../firebase/responses/responses";

// User generated marker representing poll response
export class youMarker extends mapboxgl.Marker {
  constructor(mapId, lngLat) {
    super({
      color: "#C00",
      draggable: true,
    });

    this.setLngLat(lngLat);
    this.setPopup(new mapboxgl.Popup().setHTML("<i>(You)</i>"));
    this.mapId = mapId;
    this.key = pushResponse(mapId, lngLat).then((key) => (this.key = key));

    const youMarkerDiv = this.getElement();
    youMarkerDiv.addEventListener("mouseenter", () => this.togglePopup());
    youMarkerDiv.addEventListener("mouseleave", () => this.togglePopup());

    this.on("dragend", () => updateResponse(mapId, this.getLngLat(), this.key));
  }
}
