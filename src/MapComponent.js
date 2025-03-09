import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { fromLonLat } from 'ol/proj';

const MapComponent = () => {
    const mapRef = useRef();

    useEffect(() => {
        // Define the marker's coordinates (longitude, latitude)
        const markerCoordinates = fromLonLat([4.35247, 50.84673]); // Example: Brussels

        // Create a feature for the marker
        const markerFeature = new Feature({
            geometry: new Point(markerCoordinates),
        });

        // Define the style for the marker
        const markerStyle = new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: 'marker-icon.png', // Path to your marker image
            }),
        });
        markerFeature.setStyle(markerStyle);

        // Create a vector source and layer for the marker
        const markerSource = new VectorSource({
            features: [markerFeature],
        });
        const markerLayer = new VectorLayer({
            source: markerSource,
        });

        // Initialize the map
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                markerLayer, // Add the marker layer to the map
            ],
            view: new View({
                center: markerCoordinates,
                zoom: 12,
            }),
        });

        return () => map.setTarget(null);
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '800px' }} />;
};

export default MapComponent;
