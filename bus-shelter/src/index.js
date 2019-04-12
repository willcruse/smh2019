import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function BusTimeComp(props) {
  return <h1>{props.name + " " + props.age}</h1>;
}

function App() {
  return (

    <div className="busTimes">
    <BusTimeComp name="1" age="69"/>
    <BusTimeComp name="2" age = "4"/>
    <BusTimeComp name="3" age="6"/>
    </div>

  );
}
const element = App();

ReactDOM.render(
  element,
  document.getElementById("root")
);
