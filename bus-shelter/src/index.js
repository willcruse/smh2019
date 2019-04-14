import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import localAdImg from './localAdImg.png';
import loadingCircle from './loadingCircle.gif';
import nMAV from './National_Monument_at_Vítkov.JPG';
import nG from './National_Gallery.jpg';
import nM from './National_Museum.jpg';
import tPT from './The_Powder_Tower.jpg';
import mOC from './Museum_of_Communism.jpg';
import bS from './busstop.png'
import * as $ from 'jquery';

var count = 0;
var routeNa = {
  busName: null,
  dir: null
}
var attr = []

function BusTimeComp(props) {
  var indexes = []
  for (var i = 0; i < busTimes.length; i++) {
    indexes.push(i);
  }
  if (busTimes.length > 0) {
  const mapper = indexes.map((i) =>
    (<tr>
      <td><button onClick={(e) => setRouteNa(busTimes[i]["Transport"]["name"], busTimes[i]["Transport"]["dir"])}>{busTimes[i]["Transport"]["name"]}</button></td>
      <td><button onClick={(e) => setRouteNa(busTimes[i]["Transport"]["name"], busTimes[i]["Transport"]["dir"])}>{busTimes[i]["Transport"]["dir"]}</button></td>
      <td><button onClick={(e) => setRouteNa(busTimes[i]["Transport"]["name"], busTimes[i]["Transport"]["dir"])}>{busTimes[i]["time"].substring(11, 16)}</button></td>
    </tr>)
  );
  var element = (<table><thead><tr><th>Bus</th><th>Destination</th><th>Time</th></tr></thead><tbody>{mapper}</tbody></table>);
  return element;
  }
  return <Loading />;
}

function setRouteNa(name, dir) {
  routeNa = {
    busName: name,
    dir: dir
  };
}

function LocalAd(){
  return <img src = {localAdImg} alt = "localAdImg" />;
}

class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.line = null;
    this.zoomedIn = true;
    this.platform = null;
    this.layers = null;
    this.map = null;
    this.mapEvents = null;
    this.center = {lat: 50.090463, lng: 14.439198};
    this.added = false
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
    var kk = this.map;
    var center = this.center;
    var circle = new window.H.map.Circle(center, 50);
    kk.addObject(circle);

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

    var icon = new window.H.map.Icon(bS);
  // Create a marker using the previously instantiated icon:
    var marker = new window.H.map.Marker(center, { icon: icon });
  // Add the marker to the map:
    kk.addObject(marker);
    var linestring = new window.H.geo.LineString();
    points.forEach(function(point) {
      linestring.pushPoint(point);
      // if(point !== center) {
      //   var circle = new window.H.map.Circle(point, 50);
      //   kk.addObject(circle);
      // } else {
      //   var icon = new window.H.map.Icon(bS);
      // // Create a marker using the previously instantiated icon:
      //   var marker = new window.H.map.Marker(center, { icon: icon });
      // // Add the marker to the map:
      //   kk.addObject(marker);
      // }
      });

      // Initialize a polyline with the linestring:
      var polyline = new window.H.map.Polyline(linestring, { style: { lineWidth: 10 }});
      this.map.addObject(polyline);

      var attrLoc = [{lat: 50.088761, lng: 14.450217}, {lat: 50.102308, lng: 14.434122}, {lat: 50.079469, lng: 14.434355}, {lat: 50.087486, lng: 14.428314}, {lat: 50.088154, lng: 14.430731}];
      var attrLogo = [nMAV, nG, nM, tPT, mOC];
      attr = [];

      for(var i = 0; i < attrLoc.length; i++) {

        var icon = new window.H.map.Icon(attrLogo[i]);

          var marker = new window.H.map.Marker(attrLoc[i], {icon: icon});

          this.map.addObject(marker);

          attr.push(marker);
      }



// Add the polyline to the map:
  // this.map.addObject(polyline);
    var mapEvents = new window.H.mapevents.MapEvents(this.map);
    // Add event listener:
    var ii = this.zoomedIn;
    this.map.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
    if(ii) {
        kk.setZoom(13, true);
      ii = false;
    } else {
      kk.setZoom(16, true);
      ii = true;
    }
  });
}


render() {
  // if (!this.added) {
  //   this.addLines();
  // }

  if (routeNa.dir!=null&& resultOfRoute!=null) {
    if (this.line != null) {
      this.map.removeObject(this.line);
      this.line = null;
    }
    var flag = false;
    var paths = resultOfRoute["Res"]["PathSegments"]["PathSeg"];
    var lineInfo = resultOfRoute["Res"]["LineInfos"]["LineInfo"];
    var lineString = new window.H.geo.LineString();
      for (var line in lineInfo) {
        if (lineInfo[line]["Transport"]["name"]==routeNa.busName && lineInfo[line]["Transport"]["dir"]==routeNa.dir){
          flag = true;
          var mainRoute = resultOfRoute["Res"]["LineInfos"]["LineInfo"][line]["LineSegments"][0]["seg_ids"];
          var santMainRoute = mainRoute.replace("S", "").split(" ");
          for (var segID in santMainRoute) {
            var path = paths[segID]["graph"].split(" ");
            for (var pair in path) {
              var spl = path[pair].split(",")
              if (spl.length==2) {
                var pointsObj = {
                    lat: parseFloat(spl[0]),
                    lng: parseFloat(spl[1])
                  }
                  lineString.pushPoint(pointsObj);
                  // console.log(lineString);
              }
            }
          }
          var polyline = new window.H.map.Polyline(lineString, { style: { lineWidth: 5}});
          this.map.addObject(polyline);
          this.line = polyline;
        }
      }
  }
  return (<div id="here-map" className="map"/>);
  }

}

function Info(props) {
    return (<font face="Courier New" size="6"><table><tbody><tr><td>Time</td><td>{props.tim}</td></tr><tr><td>Weather</td><td>{props.fore}</td></tr><tr><td>Temp</td><td>{props .temp + "°C"}</td></tr></tbody></table></font>);
}

function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    var string = nd.toLocaleString();
    var time = string.substring(12);
    return time;
}

class OtherComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      res: LocalAd()
    };
  }

  componentDidMount() {
    this.timerID = setInterval (
      () => this.change(),
      15000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  change() {
    if (this.state.count % 2 === 0) {
      this.setState({
        count: count+1,
        res: Info(weather)
      });
      clearInterval(this.timerID);
      this.timerID = setInterval (
        () => this.change(),
          15000
      );
    } else {
      this.setState({
        count: count+1,
        res: LocalAd()
      });
      clearInterval(this.timerID);
      this.timerID = setInterval (
        () => this.change(),
        15000
      );
    }
  }

  render() {
    return this.state.res
  }
}

function Loading(props) {
  return <img src = {loadingCircle} alt = "loadingCircle" align="center"/>;
}

function App() {
  return (
    <div>
    <div className="busTimes">
      <BusTimeComp busTimes={busTimes}/>
    </div>
     <div className="other">
       <Loading />
    </div>
    <div className="map">
      <MapContainer />
    </div>
  </div>

  );
}

function LoadedApp(){
  return (
    <div>
    <div className="busTimes">
      <BusTimeComp busTimes={busTimes}/>

    </div>
     <div className="other" >
      <OtherComp data={weather}/>
    </div>
    <div id="mapContainer" className="map">
    <MapContainer fetchedRoutes={resultOfRoute, routeNa}/>
    </div>
  </div>
  );
}

var weather = {};
var resultOfRoute = {};
var busTimes = [];

function fetchData() {
  fetch('http://api.openweathermap.org/data/2.5/forecast/hourly?lat=50.090474&lon=14.437535&appid=126d1e5694781bd92423de08f354b1a8')
   .then(function (response) {
     return response.json();
   }).then(function (myJson) {
     // console.log("")
     // var t = Math.round(myJson["list"][1]["main"]["temp"]-273);
     // var f = myJson["list"][1]["weather"][0]["main"]
     var ti = calcTime("+2");
     // weather = {
     //   "temp": t,
     //   "fore": f,
     //   "tim": ti
     // };
     weather = {
       "temp": 30,
       "fore": "cloud",
        "tim": ti
     }
   });
     const loaded = LoadedApp(routeNa);
     ReactDOM.render(loaded,
     document.getElementById("root"));
   // });
}

function fetchBusTimes() {
  var date = new Date().toLocaleString("en-US", {timeZone: "Europe/Prague"});
  date = new Date(date);
  date = JSON.stringify(date.toLocaleTimeString());

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

  $.ajax({
    url: 'https://transit.api.here.com/v3/board.json',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callbackFunc',
    data: {
      lang: "en",
      stnId: "409905340",
      time: calcTime('+2'),
      string: "1",
      app_id: "GXp8WND2pdawXC8v30Jl",
      app_code: "0PFpoPJe5cI9dfxiCwJrWw"
    },
    success: function (data) {
      var temp = [];
      for(var dep in data["Res"]["NextDepartures"]["Dep"]) {
        if (temp.length < 8 && (data["Res"]["NextDepartures"]["Dep"][dep]["Stn"]["id"]=="409905335")) {
          temp.push(data["Res"]["NextDepartures"]["Dep"][dep]);
        }
      }
      busTimes = temp;
      // const loaded = LoadedApp();
      // ReactDOM.render(loaded,
      // document.getElementById("root"));
    }
  });
}

function fetchRoutesThrough() {
  fetch('https://transit.api.here.com/v3/lines/by_stn_id.json?app_id=GXp8WND2pdawXC8v30Jl&app_code=0PFpoPJe5cI9dfxiCwJrWw&stnId=409905335&graph=1')
  .then(function (response) {
    return response.json();
  }).then(function (myJson) {
    resultOfRoute = myJson;
    // const loaded = LoadedApp();
    // ReactDOM.render(loaded,
    // document.getElementById("root"));
  });
}

const element = App();
ReactDOM.render(
  element,
  document.getElementById("root")
);

fetchRoutesThrough();

setInterval(
  function () {
    fetchData();
    fetchBusTimes();
    const ak = LoadedApp(routeNa);
    ReactDOM.render(ak, document.getElementById("root"));},
  1050
);
