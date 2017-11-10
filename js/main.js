
var mymap = L.map('mapid',{
	 minZoom: 2.0,
     maxZoom: 5
}).setView([36.226725, -27.779352], 2.0);

$(window).on("resize", function () { $("#mapid").height($(window).height()); mymap.invalidateSize(); }).trigger("resize");
L.tileLayer('https://api.mapbox.com/styles/v1/yhan1995/cj5wqjxiu7oq02rld6w4uyv8n/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1IjoieWhhbjE5OTUiLCJhIjoiY2o1d3E5M2wwMGg2YzJ3cDYya3k3MmxsZiJ9.gJ_Le0KXHQtrQbjoHxbneg'
}).addTo(mymap);

var bounds = L.latLngBounds([[-55.0, -180.0], [85.0, 180.0]]);
mymap.setMaxBounds(bounds);
mymap.on('drag', function() {
	map.panInsideBounds(bounds, { animate: false });
});



var geojson =
{
    "type": "FeatureCollection",
    "totalFeatures": 10,
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-111.9981412, 33.3919027]
        },
        "properties": {
            "place": "state",
            "name": "Tempe, Arizona",
            "id": "tempe"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-77.5633017, 37.5246403]
        },
        "properties": {
            "place": "state",
            "name": "Richmond, Virginia",
            "id": "richmond"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-83.2392897, 42.3526257]
        },
        "properties": {
            "place": "state",
            "name": "Detroit, Michigan",
            "id": "detroit"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-122.5076403, 37.7576793]
        },
        "properties": {
            "place": "state",
            "name": "San Francisco, CA",
            "id": "sf"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-119.9909265, 39.557847]
        },
        "properties": {
            "place": "state",
            "name": "Reno, Nevada",
            "id": "reno"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-88.012343, 41.8333925]
        },
        "properties": {
            "place": "state",
            "name": "Chicago, Illinois",
            "id": "chicago"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-79.5181425, 43.7181557]
        },
        "properties": {
            "place": "state",
            "name": "Toronto, Canada",
            "id": "toronto"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-68.919015, 44.067577]
        },
        "properties": {
            "place": "state",
            "name": "Maine, Vinalhaven",
            "id": "maine"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-8.7001796, 52.6514944]
        },
        "properties": {
            "place": "state",
            "name": "Limerick, Ireland",
            "id": "limerick"
        }
    },{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-2.0037145, 52.4773549]
        },
        "properties": {
            "place": "state",
            "name": "Birmingham, UK",
            "id": "birmingham"
        }
    }]
};


var blueIcon = new L.Icon({
    iconUrl: 'img/marker-icon-2x-blue.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var redIcon = new L.Icon({
    iconUrl: 'img/marker-icon-2x-red.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

geojsonLayer = L.geoJson(geojson, {
    style: function (feature) {
        return {
            color: "red"
        };
    },
    pointToLayer: function (feature, latlng) {
        return new L.marker(latlng,{icon: blueIcon});
    },
    onEachFeature: function (feature, layer) {
        //layer.bindPopup(feature.properties.GPSUserName);

        layer.on('click', function (e) {

            document.getElementById("info").innerHTML = feature.properties.name;
            document.getElementById("paper").src = "info/"+ feature.properties.id +"/paper.png"
            document.getElementById("picture").src = "info/"+ feature.properties.id +"/picture.png"
            document.getElementById("popUp").href = "info/"+ feature.properties.id +"/paper.png"

            //document.getElementById("paper").setAttribute("data-zoom-image", "info/"+ feature.properties.id +"/paper.png");
        });

        layer.on('mouseover', function(e) {
           
            this.setIcon(redIcon);
        });
        layer.on('mouseout', function(e) {
           
            this.setIcon(blueIcon);
        });

        
    }
});

geojsonLayer.addTo(mymap);

$('.image-popup-no-margins').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

