import mapboxgl from 'mapbox-gl';
import { pushResponse } from '../../firebase/firebase';

const confirmPopupContent = `<button id="confirmPoint" class="btn btn-primary btn-sm>Confirm</button>`
const confirmPopup = new mapboxgl.Popup().setLngLat(lngLat).setHTML(confirmPopupContent)

// Returns point marker at specified lng/lat and stores it in firebase
export const createYouMarker = async (lngLat, mapId) => {
    const youMarker = new mapboxgl.Marker({
        color: "#C00"
    }).setLngLat(lngLat)
    await pushResponse(mapId, lngLat);
    return youMarker;   
}
