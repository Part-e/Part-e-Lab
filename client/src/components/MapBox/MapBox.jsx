import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export function MapWithGeocoder({ onLocation }) {
  const mapContainerRef = useRef();
  const [ map, setMap ] = useState(null); // [map, setMap]
  const [inputValue, setInputValue] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handelChange = (e) => {
    setInputValue(e);
    onLocation(e)
  }

  const handleRetrieve = (e) => {
    onLocation(e.features[0].properties.name)
  }

  const theme = {
    variables:{
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      unit: '14px',
      maxWidth: '100px'
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID
      center: [-99.133209, 19.432608], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });

    setMap(map);

    return () => map.remove();
  }, []);

  const mapContainerStyle = {
    height: '260px',
    width: windowWidth < 480 ? '100%' : '500px', // Ajusta el ancho para teléfonos
  };

  return (
    <>
      <SearchBox
        options={{
          language: 'es',
          country: 'MX'
        }}
        theme={theme}
        accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        map={map}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={handelChange}
        onRetrieve={handleRetrieve}
        placeholder="Buscar dirección"
        marker
      />
      <div id="map-container" ref={mapContainerRef} style={mapContainerStyle} />
    </>
  );
}