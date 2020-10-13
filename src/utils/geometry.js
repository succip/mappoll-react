export const buildPolygonFromBounds = ({ _ne: ne, _sw: sw }) => {
  return {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [sw.lng, ne.lat],
            [ne.lng, ne.lat],
            [ne.lng, sw.lat],
            [sw.lng, sw.lat],
            [sw.lng, ne.lat],
          ],
        ],
      },
    },
  };
};
