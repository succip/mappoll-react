import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

class MapPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 0,
      lat: 0,
      zoom: 0,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    map.addControl(new mapboxgl.NavigationControl());
  }
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
