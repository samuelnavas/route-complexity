  
  map = L.map('map').setView([0, 0], 2);

  map.attributionControl.setPrefix('<a href="http://leafletjs.com/" target=blank> Leaflet</a> |'+
                                   'Powered by <a href="https://graphhopper.com/#directions-api" target="_blank">GraphHopper API</a> |'+
                                   'Samuel Navas Medrano');

  var mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:  '(c) <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors',
    maxZoom:19 
  }).addTo(map);

  var MapQuestOpen_OSM = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
    type: 'map',
    ext: 'jpg',
    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: '1234'
  });

  var Thunderforest_OpenCycleMap = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  var Thunderforest_Transport = L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  });

  var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  var baseMaps = {
    "Street map": mapnik,
    "Cycle map": Thunderforest_OpenCycleMap,
    "Public transport": Thunderforest_Transport,
    "Satellite" : Esri_WorldImagery
  };

  L.control.layers(baseMaps).addTo(map);

  function removeChilds(element){
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function search(){
    var place = document.getElementById("search").value;
    var list = document.getElementById("searchPlaces");
    var gmapsAPI = "http://maps.googleapis.com/maps/api/geocode/json?language=en&address=";
    console.log(gmapsAPI+place);
    var jsonData = $.ajax({
      url:gmapsAPI+place,
      dataType:"json",
      async:true,
      success: function(json){
        //removeChilds(list);
        var v = json.results[0];
        var southWest = L.latLng(v['geometry']['viewport']['northeast']['lat'], v['geometry']['viewport']['northeast']['lng']);
        var northEast = L.latLng(v['geometry']['viewport']['southwest']['lat'], v['geometry']['viewport']['southwest']['lng']);
        var bounds = L.latLngBounds(southWest, northEast);
        map.fitBounds(bounds)
        /*
        $.each(json.results, function(k,v) {
          var node = document.createElement("LI");
          var southWest = L.latLng(v['geometry']['viewport']['northeast']['lat'], v['geometry']['viewport']['northeast']['lng']);
          var northEast = L.latLng(v['geometry']['viewport']['southwest']['lat'], v['geometry']['viewport']['southwest']['lng']);
          var bounds = L.latLngBounds(southWest, northEast);
          var textnode = document.createTextNode(v['formatted_address']);
          node.appendChild(textnode);
          node.addEventListener("click",function(){map.fitBounds(bounds)});
          list.appendChild(node);
        });*/
      }
    });
  }
  
  console.log("Javascript loaded");