import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import localAdImg from './localAdImg.png';

console.log(localAdImg);

function mapComp(props) {
  return <h1>{props.name + " " + props.age}</h1>;
}

function localAd(props){
  return <img src = {props.localAdImg} alt = "localAdImg" />;
}

function App() {
  return (
    <div>
    <div className="map">
    <mapComp name="1" age="69"/>
    <mapComp name="2" age = "4"/>
    <mapComp name="3" age="6"/>
    </div>

    <div className="localAd">
    <localAd ad={localAdImg} />
    </div>

    <div className="bigAd">
    <mapComp name="1" age="69"/>
    <mapComp name="2" age = "4"/>
    <mapComp name="3" age="6"/>
    </div>
    </div>
  );
}
const element = App();

ReactDOM.render(
  element,
  document.getElementById("root")
);
