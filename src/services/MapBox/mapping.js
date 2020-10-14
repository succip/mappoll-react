import mapboxgl from 'mapbox-gl';
import { pushResponse } from '../../firebase/firebase';

// Returns point marker at specified lng/lat and stores it in firebase
export const createYouMarker = async (lngLat, mapId) => {
    const youMarker = new mapboxgl.Marker({
        color: "#C00",
        draggable: true
    }).setLngLat(lngLat)

    youMarker.on('dragend', () => {
        console.log('drag ended!');
    })
    // await pushResponse(mapId, lngLat);
    return youMarker;
}