import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function BusTimeComp(props) {
  const indexes = [0, 1, 2, 3, 4];
  const mapper = indexes.map((i) =>
    (<tr><td>{props.names[i]}</td><td>{props.destinations[i]}</td><td>{props.times[i]}</td></tr>)
);
var element = (<table><th>Bus</th><th>Destination</th><th>Time To Arrival</th>{mapper}</table>);
return element;
}

function App() {
  var names = ["U1", "U2", "U3", "U4", "U5"];
  var destinations = ["University of Bath", "Odd Down", "Can't Spell Uni", "Go To", "Bath Spa"];
  var times = [1, 2, 3, 4, 5];
  return (
    <div>
    <div className="busTimes">
      <BusTimeComp names={names} destinations={destinations} times={times}/>
    </div>
    {/* <div className="other">

    </div>
    <div className="map">
    </div> */}
  </div>
  );
}
const element = App();
ReactDOM.render(
  element,
  document.getElementById("root")
);
