import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { pushResponse, getResponses } from "../firebase/firebase";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

class MapPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.props.mapInfo.mapProps.lng, this.props.mapInfo.mapProps.lat],
      zoom: this.props.mapInfo.mapProps.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.on("click", (e) => {
      const popupContent = `<button id="confirmPoint" class="btn btn-primary btn-sm">Confirm</button>`;
      const popup = new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(popupContent).addTo(map);
      document.getElementById("confirmPoint").addEventListener("click", () => {
        this.submitMarker(e.lngLat, map);
        this.addResponsesToMap(map);
        popup.remove();
      });
    });
  }

  submitMarker = ({ lng, lat }, map) => {
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    pushResponse(this.props.mapInfo.mapId, { lng, lat });
  };

  addResponsesToMap = async (map) => {
    const points = await getResponses(this.props.mapInfo.mapId);

    points.forEach((pt, i) => {
      setTimeout(() => {
        new mapboxgl.Marker().setLngLat([pt.lng, pt.lat]).addTo(map);
      }, i * 50);
    });
  };

  render() {
    return (
      <>
        <label htmlFor="map">Click somewhere on the map to submit your response:</label>
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
