import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import localAdImg from './localAdImg.png';


var count = 0;

function BusTimeComp(props) {
  const indexes = [0, 1, 2, 3, 4];
  const mapper = indexes.map((i) =>
    (<tr>
      <td><button onClick={(e) => alert(i)}>{props.names[i]}</button></td>
      <td><button onClick={(e) => alert(i)}>{props.destinations[i]}</button></td>
      <td><button onClick={(e) => alert(i)}>{props.times[i]}</button></td>
    </tr>)
);
var element = (<table><thead><tr><th>Bus</th><th>Destination</th><th>Time To Arrival</th></tr></thead><tbody>{mapper}</tbody></table>);
return element;
}

function LocalAd(){
  return <img src = {localAdImg} alt = "localAdImg" />;
}



class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <table><tbody><tr><td>Time</td><td>{this.props.data.tim}</td></tr><tr><td>Weather</td><td>{this.props.data.fore}</td></tr><tr><td>Temp</td><td>{this.props.data.temp + "C"}</td></tr></tbody></table>;
  }

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
      45000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  change() {
    if (this.state.count % 2 === 0) {
      this.setState({
        count: count+1,
        res: Info()
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
        45000
      );
    }
  }

  render() {
    return this.state.res
  }
}

function Loading() {
  return <h1>Loading</h1>;
}

function App() {
  {/*TODO SoftCode This Shit*/}
  var names = ["U1", "U2", "U3", "U4", "U5"];
  var destinations = ["University of Bath", "Odd Down", "Can't Spell Uni", "Go To", "Bath Spa"];
  var times = [1, 2, 3, 4, 5];
  return (
    <div>
    <div className="busTimes">
      <BusTimeComp names={names} destinations={destinations} times={times}/>
    </div>
     <div className="other">
      <Loading />
    </div>
    {/*<div className="map">
    </div> */}
  </div>
  );
}

function LoadedApp(){
  {/*TODO SoftCode This Shit*/}
  var names = ["U1", "U2", "U3", "U4", "U5"];
  var destinations = ["University of Bath", "Odd Down", "Can't Spell Uni", "Go To", "Bath Spa"];
  var times = [1, 2, 3, 4, 5];
  return (
    <div>
    <div className="busTimes">
      <BusTimeComp names={names} destinations={destinations} times={times}/>
    </div>
     <div className="other" >
      <Info data={weather}/>
    </div>
    {/*<div className="map">
    </div> */}
  </div>
  );
}

var weather = {};

function fetchData() {
  fetch('http://api.openweathermap.org/data/2.5/forecast/hourly?lat=50.090474&lon=14.437535&appid=36785063bdf731228df7be0df5b5562c')
   .then(function (response) {
     return response.json();
   }).then(function (myJson) {
     var t = Math.round(myJson["list"][1]["main"]["temp"]-273);
     var f = myJson["list"][1]["weather"][0]["main"]
     var ti = calcTime("+2");
     weather = {
       "temp": t,
       "fore": f,
       "tim": ti
     };
     console.log("ahoy");
     const loaded = LoadedApp();
     ReactDOM.render(loaded,
     document.getElementById("root"));
   });
}


const element = App();
ReactDOM.render(
  element,
  document.getElementById("root")
);
var timer = setInterval(
  function () {
    fetchData();
    const ak = LoadedApp();
    ReactDOM.render(ak, document.getElementById("root"));
  }
  ,
  1000
);
