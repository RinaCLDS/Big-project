// import { useMap } from 'react-leaflet';
// import L from 'leaflet';
// import { useEffect } from 'react';

// function HighlightedFeatured() {
//     const map = useMap();
//     useEffect(() => {
//         const legend = L.control({ position: 'bottomright' });
//         legend.onAdd = () => {
//             var div = L.DomUtil.create('div', 'info legend'),
//                 grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//                 labels = [];

//             // loop through our density intervals and generate a label with a colored square for each interval
//             for (var i = 0; i < grades.length; i++) {
//                 div.innerHTML +=
//                     '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//                     grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//             }

//             return div;
//         };
//         legend.addTo(map);
//     }, [map]);
//     return null;
// }

// export default HighlightedFeatured;

// // info.onAdd = function (map) {
// //     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
// //     this.update();
// //     return this._div;
// // };

// // // method that we will use to update the control based on feature properties passed
// // info.update = function (props) {
// //     this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
// //         '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
// //         : 'Hover over a state');
// // };