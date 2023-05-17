import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

 function Legend() {
  const map = useMap();
  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = '<h4 class="text-black">This is the legend</h4>' + '<b class="text-black">Lorem ipsum dolor sit amet consectetur adipiscing</b>';
      return div;
    };
    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [map]);
  return null;
}

export default Legend;