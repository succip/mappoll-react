import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

class MapBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -123.117932,
      lat: 49.257362,
      zoom: 9,
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
      <React.Fragment>
        <label htmlFor="map">Set Map Extent</label>
        <div className="mapContainer" id="map" ref={(el) => (this.mapContainer = el)} />
      </React.Fragment>
    );
  }
}

export default MapBuilder;
