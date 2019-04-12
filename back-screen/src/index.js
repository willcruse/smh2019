import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function BusTimeComp(props) {
  return <h1>{props.name + " " + props.age}</h1>;
}

function App() {
  return (
    <div>
    <div className="map">
    <BusTimeComp name="1" age="69"/>
    <BusTimeComp name="2" age = "4"/>
    <BusTimeComp name="3" age="6"/>
    </div>

    <div className="localAd">
    <BusTimeComp name="1" age="69"/>
    <BusTimeComp name="2" age = "4"/>
    <BusTimeComp name="3" age="6"/>
    </div>

    <div className="bigAd">
    <BusTimeComp name="1" age="69"/>
    <BusTimeComp name="2" age = "4"/>
    <BusTimeComp name="3" age="6"/>
    </div>
    </div>
  );
}
const element = App();

ReactDOM.render(
  element,
  document.getElementById("root")
);
