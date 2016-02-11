  
  map = L.map('map').setView([0, 0], 2);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:  '(c) <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors |'+
                  ' Powered by <a href="https://graphhopper.com/#directions-api" target="_blank">GraphHopper API</a> |'+
                  ' Samuel Navas Medrano',
    maxZoom:19 
  }).addTo(map);
  map.attributionControl.setPrefix('<a href="http://leafletjs.com/" target=blank> Leaflet</a>');

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