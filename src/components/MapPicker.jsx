import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

class MapPicker extends Component {
  componentDidUpdate() {
    const popupContent = `<button class="btn btn-primary btn-sm">Confirm</button>`;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.props.mapProps.lng, this.props.mapProps.lat],
      zoom: this.props.mapProps.zoom,
    });
    map.addControl(new mapboxgl.NavigationControl());

    map.on("click", (e) => {
      new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(popupContent).addTo(map);
    });
  }

  dropMaker = () => {
    console.log("marker dropped!");
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
