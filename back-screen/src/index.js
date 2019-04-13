import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './index.css';
import localAdImg from './localAdImg.png';
import cityTourism from './cityTourism.png';

// $.ajax({
//   url: 'https://transit.api.here.com/v3/board.json',
//   type: 'GET',
//   dataType: 'jsonp',
//   jsonp: 'callbackFunc',
//   data: {
//     lang: "en",
//     stnId: "409905340",
//     time: calcTime('+2'),
//     string: "1",
//     app_id: "GXp8WND2pdawXC8v30Jl",
//     app_code: "0PFpoPJe5cI9dfxiCwJrWw"
//   },
//   success: function (data) {
//     console.log(JSON.stringify(data));
//     var count = 0;
//     var obj;
//     for(var dep in data["Res"]["NextDepartures"]["Dep"]) {
//       //console.log(dep);
//       if(data["Res"]["NextDepartures"]["Dep"][dep]["Transport"]["name"] == "207" &&
//           data["Res"]["NextDepartures"]["Dep"][dep]["Transport"]["dir"] == "Staroměstská") {
//         console.log(data["Res"]["NextDepartures"]["Dep"][dep]["time"]);
//         obj[count] = data["Res"]["NextDepartures"]["Dep"][dep]["time"];
//         count++;
//       }
//     }
//     if (count < 5) {
//       for (;count<5;count++) {
//         obj[count] = "";
//       }
//     }
//
//   }
// });

function calcTime(offset) {
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*offset));
  var string = nd.toLocaleString();
  var year = string.substring(6, 10);
  var month = string.substring(3, 5);
  var day = string.substring(0, 2);
  var time = string.substring(12);
  return year + "-" + month + "-" + day + "T" + time;
}

function LocalAd(props){
  return <img src = {props.localAdImg} alt = "localAdImg" />;
}

function BigAd(props){
  return <img src = {props.localAdImg} alt = "cityTourism" />;
}

class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.zoomedIn = true;
    this.platform = null;
    this.layers = null;
    this.map = null;
    this.mapEvents = null;
    this.center = {lat: 50.090463, lng: 14.439198};
  }

  componentDidMount() {
    // Initialize the platform object:
    this.platform = new window.H.service.Platform({
    'app_id': 'GXp8WND2pdawXC8v30Jl',
    'app_code': '0PFpoPJe5cI9dfxiCwJrWw'
    });
    this.layers = this.platform.createDefaultLayers();
    var container = document.getElementById('here-map');
    this.map = new window.H.Map(
      container,
      this.layers.normal.traffic,
      {
        zoom: 16,
        center: this.center,
    });

    var center = this.center;
    var points = [
      {lat: 50.088368, lng: 14.415394},
      {lat: 50.091416, lng: 14.417622},
      {lat: 50.093075, lng: 14.423298},
      {lat: 50.091828, lng: 14.427658},
      {lat: 50.088687, lng: 14.429805},
      {lat: 50.090066, lng: 14.435381},
      center,
      {lat: 50.086932, lng: 14.445093},
      {lat: 50.087257, lng: 14.452633},
      {lat: 50.088884, lng: 14.461676},
      {lat: 50.090625, lng: 14.469391},
      {lat: 50.091341, lng: 14.468275}
    ];
    var kk = this.map;
    var linestring = new window.H.geo.LineString();
    points.forEach(function(point) {
      linestring.pushPoint(point);
      if(point != center) {
        var circle = new window.H.map.Circle(point, 50);
        kk.addObject(circle);
      } else {
        var icon = new window.H.map.Icon('icon/busstop.png');

      // Create a marker using the previously instantiated icon:
        var marker = new window.H.map.Marker(center, { icon: icon });

      // Add the marker to the map:
        kk.addObject(marker);
      }

    });

// Initialize a polyline with the linestring:
  var polyline = new window.H.map.Polyline(linestring, { style: { lineWidth: 10 }});

// Add the polyline to the map:
  this.map.addObject(polyline);
    console.log(this.map);
    var mapEvents = new window.H.mapevents.MapEvents(this.map);
    // Add event listener:
    var ii = this.zoomedIn;
    this.map.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
    if(ii) {
        kk.setZoom(13.7, true);
      ii = false;
    } else {
      kk.setZoom(16, true);
      ii = true;
    }
  });
}



  render() {
    return (<div id="here-map" className="map"/>);
  }

}

function Map() {
  return (<MapContainer />);
}

function LoadedApp() {
  return (
    <div>
      <MapContainer />
      <div className="localAd">
      <LocalAd ad={localAdImg} />
      </div>

      <div className="bigAd">
      <BigAd ad={localAdImg} />
      </div>
    </div>
  )
}

function Loading() {
  return <h1>Loading</h1>;
}

function App() {
  return (
    <div>
    <div className="map">
      <Loading />
    </div>

    <div className="localAd">
    <localAd ad={localAdImg} />
    </div>

    <div className="bigAd">
    <BigAd ad={localAdImg} />
    </div>
    </div>
  );
}

const element = LoadedApp();
ReactDOM.render(
  element,
  document.getElementById("root")
);
