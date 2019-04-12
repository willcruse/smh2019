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

function Info(props) {
  return <h1> Keith </h1>
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
      <OtherComp />
    </div>
    {/*<div className="map">
    </div> */}
  </div>
  );
}

const element = App();
ReactDOM.render(
  element,
  document.getElementById("root")
);
