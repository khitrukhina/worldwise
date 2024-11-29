import {useNavigate} from 'react-router-dom';
import styles from './Map.module.css';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import {useEffect, useState} from 'react';
import {useCities} from '../context/CitiesContext.jsx';
import {useGeolocation} from '../hooks/useGeolocation.js';
import Button from './Button.jsx';
import {useUrlPosition} from '../hooks/useUrlPosition.js';

export default function Map() {
    const {cities} = useCities();
    const {position: geoPosition, isLoading: isLoadingPosition, getPosition} = useGeolocation();
    const [mapPosition, setMapPosition] = useState([40, 0])
    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
        if (geoPosition) {
            setMapPosition([geoPosition.lat, geoPosition.lng])
        }
    }, [geoPosition]);

    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    return <div className={styles.mapContainer}>
        <Button onClick={getPosition} type="position">{isLoadingPosition ? 'Loading...' : 'Use your position'}</Button>
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {
                cities.map(c => {
                    return (
                        <Marker key={c.id} position={[c.position.lat, c.position.lng]}>
                            <Popup>
                                <span>{c.emoji} {c.cityName}</span>
                            </Popup>
                        </Marker>
                    )
                })
            }

            <DetectClick/>
            <ChangeCenter position={mapPosition}></ChangeCenter>
        </MapContainer>
    </div>;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            const {lat, lng} = e.latlng;
            navigate(`form?lat=${lat}&${lng}`);
        },
    });
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position)

    return null;
}
