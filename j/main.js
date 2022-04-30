



//create a empty Leaflet map.
const map = L.map('map').setView([20.5937, 78.9629
],13);

//load map with map tiles

/* const myTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});*/

var basemaps = {
    myTiles: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

 ,OpenTopoMap:L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 25,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
 })

,StamenTerrain:L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
})
,Stamen_Watercolor:L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
})

 ,USGS_USImagery:L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
})
 ,googleStreets:L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
 ,googleHybrid:L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
,googleSat:L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})

};
basemaps.myTiles.addTo(map)
//L.control.layers(basemaps).addTo(map);



//myTiles.addTo(map);
var myIcon = L.icon({
    iconUrl: 'image/streetview.png',
    iconSize: [80, 80],
    
});
//circle added--//
 var circle = L.circle([37.80, -121.978500],{
    color:"green",
	fillColor:"blue",
	opacity:1,
	radius:700
 }).addTo(map);

const place ="San Ramon";
var myMarker = L.marker([37.78, -121.978056],{icon:myIcon,draggable:true});
var popup = myMarker.bindPopup(`<h2>Welcome to ${place}</h2>` + myMarker.getLatLng()).openPopup();
popup.addTo(map);

console.log(myMarker.toGeoJSON());

var polygonData = L.geoJSON(polygonJson,{
	onEachFeature:function(feature,layer){
		layer.bindPopup(`<b> Name: </b>` + feature.properties.name)

	},
	style:{ 
		fillColor: 'pink',
		fillOpacity: 0.6,
		color:"blue",
	}
}).addTo(map);


var pointData = L.geoJSON(pointJson).addTo(map);


//layer controls//

var baseMaps = {
	"Tiles": basemaps.myTiles,
	"Topo Map":basemaps.OpenTopoMap,
	"Water Color": basemaps.Stamen_Watercolor,
	"US Imagery" : basemaps.USGS_USImagery,
	"Street Maps" : basemaps.googleStreets,
	"Google Hybrid" : basemaps.googleHybrid,
	"Googl Statellite" : basemaps.googleSat
};

var overlayMaps = {
	"Markers" : myMarker,
	"Interesting Point" : pointData,
	"Schools" : polygonData,
	
};

 L.control.layers(baseMaps, overlayMaps).addTo(map);

 ///---Events-----//

 map.on('mouseover',function(){
	 console.log('Your mouse is mover the Map');
 })

 map.on('mousemove', (e) => {
   console.log(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`);

document.getElementsByClassName("coordinate")[0].innerHTML = `lat: ${e.latlng.lat},lng: ${e.latlng.lng}`;
})


 //---style ---
