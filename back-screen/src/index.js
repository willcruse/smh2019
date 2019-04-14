import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import localAdImg from './localAdImg.png';
import cityTourism from './cityTourism.png';
import './index.css';
import loadingCircle from './loadingCircle.gif';
import nMAV from './National_Monument_at_Vítkov.JPG';
import nG from './National_Gallery.jpg';
import nM from './National_Museum.jpg';
import tPT from './The_Powder_Tower.jpg';
import mOC from './Museum_of_Communism.jpg';
import bS from './busstop.png'


function LocalAd(props){
  return <div className="localAd"/>;
}

function BigAd(props){
  return <div className="bigAd"/>;
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



      var attrLoc = [{lat: 50.088761, lng: 14.450217}, {lat: 50.102308, lng: 14.434122}, {lat: 50.079469, lng: 14.434355}, {lat: 50.087486, lng: 14.428314}, {lat: 50.088154, lng: 14.430731}];
      var attrLogo = [nMAV, nG, nM, tPT, mOC];
      var attr = [];

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
      <BigAd ad={cityTourism} />
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
    <BigAd ad={cityTourism} />
    </div>
    </div>
  );
}

const element = LoadedApp();
ReactDOM.render(
  element,
  document.getElementById("root")
);
