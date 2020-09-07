import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { pushResponse } from "../firebase/firebase";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

class MapPicker extends Component {
  componentDidUpdate() {
    const popupContent = `<button id="confirmPoint" class="btn btn-primary btn-sm">Confirm</button>`;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.props.mapInfo.mapProps.lng, this.props.mapInfo.mapProps.lat],
      zoom: this.props.mapInfo.mapProps.zoom,
    });
    map.addControl(new mapboxgl.NavigationControl());

    map.on("click", (e) => {
      const popup = new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(popupContent).addTo(map);
      document.getElementById("confirmPoint").addEventListener("click", () => {
        this.dropMaker(e.lngLat, map);
        popup.remove();
      });
    });
  }

  dropMaker = ({ lng, lat }, map) => {
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    pushResponse(this.props.mapInfo.mapId, { lng, lat })
  };

  render() {
    return (
      <>
        <label htmlFor="map">Submit Your Response</label>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="mapContainer" id="map" ref={(el) => (this.mapContainer = el)}></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MapPicker;
