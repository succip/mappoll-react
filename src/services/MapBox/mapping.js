import mapboxgl from 'mapbox-gl';
import { pushResponse } from '../../firebase/firebase';

// returns a point that could be added to the map
export const createYouMarker = async (lngLat, mapId) => {

    const youMarker = new mapboxgl.Marker({
        color: "#C00"
    }).setLngLat(lngLat)

    await pushResponse(mapId, lngLat);

    return youMarker;   
}