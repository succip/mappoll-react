import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

class MapBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMapChange = () => {
    this.props.onMapChange({
      ...this.state,
    });
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-123.117932, 49.257362],
      zoom: 9,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(
      new MapBoxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
      })
    );

    map.on("move", () => {
      this.props.onMapChange({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.on("render", () => {
      this.props.onMapChange({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
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
