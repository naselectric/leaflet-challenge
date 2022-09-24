
const url ='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
    
d3.json(url,(function(data) {
        console.log(data);
        var n= Object.values(data);
        var x1=n[2];
        console.log(x1);
        var geometry= x1.map(i=>i.geometry);
        var properties=x1.map(i=>i.properties);
        var mag=properties.map(i=>i.mag);
        // var geometry1=Object.values(geometry[1]);
        console.log(geometry,properties);
      coordinates=geometry.map(i=>i.coordinates);
      console.log(coordinates);
      var lat=[];
      var long=[];
      coordinates.forEach(i=>{
        lat.push(i[1]);
        long.push(i[0]);
      });

      console.log(lat,long,mag);



   
     

var myMap = L.map("map", {
    center: [37, -96],
    zoom: 3.6
  });
  
  // Add a tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


  function magColor(d) {
    return d > 5 ? 'rgb(198, 252, 148)' :
           d > 4  ? 'rgb(255, 191, 255)' :
           d > 3  ? 'rgb(52, 179, 15)' :
           d > 2  ? 'rgb(138, 43, 226)' :
           d > 1   ? 'rgb(255, 255, 45)' :
           d > 0   ? 'rgb(105, 12, 12)' :
                      'rgb(255, 128, 128)';
}



let loctext= 'Latitude and Longitude of Earth Quake is: ' + '<br>'
let magtext= '<br>'+'With a Magnitude of: '




for(i=0;i<lat.length;i++){

  let spot=loctext + lat[i].toFixed(2).toString()+', '
   + long[i].toFixed(2).toString() + 
   magtext + mag[i].toString();
 
  L.circle([lat[i], long[i]], {
    color: magColor(mag[i]),
    fillColor: magColor(mag[i]),
    fillOpacity: 1,
    radius: 20000*mag[i]    
}).addTo(myMap)
  .bindPopup(spot);

}





         var legend = '../Instructions/legend.png';
         var legendframe = [[35, -135], [15, -125]];
         var overlay = L.imageOverlay(legend, legendframe);
         overlay.addTo(myMap);





}))
