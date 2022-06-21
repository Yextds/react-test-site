import './main.css';
import React, { useState ,Component } from 'react';
import { createRoot } from 'react-dom/client';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}


function Car(props) {
  return <li>I am a { props.brand }</li>;
}

function Garage() {
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <>
	    <h1>Who lives in my garage?</h1>
	    <ul>
        {cars.map((car) => <Car brand={car} />)}
      </ul>
    </>
  );
}



class LocationsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {locations: []};
  }

  componentDidMount() {
    this.LocationsList();
  }

  LocationsList() {
    
	var baseURL = "https://liveapi-sandbox.yext.com/v2/accounts/me/entities?";
		var api_key = "b262ae7768eec3bfa53bfca6d48e4000";
		var vparam = "20181017";   
		var entityTypes = "location";    
		var limit = 50;
		var fullURL =
			baseURL +
			"api_key=" +
			api_key +
			"&v=" +
			vparam +
			"&limit=" +
			limit + 
			"&savedFilterIds=916221098&entityTypes=" +
			entityTypes ;
					
			fetch(fullURL).then(response => response.json()).then(result => {
			
				if (!result.errors) {
							if (result.response.count > 0) {
								// console.log(result.response.entities);
								this.setState({ locations: result.response.entities })																
							} else {

							}
						} else {
				}

			});	
	
  }

  render() {
    const locations = this.state.locations.map((item, i) => (
      <div>
        <h1>{item.name}</h1>
        <span>{ item.address.line1 }, { item.address.city }, { item.address.region } - { item.address.postalCode }</span>
      </div>	  
    ));

    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list">{ locations }</div>
      </div>
    );
  }
}

/*
const App = () => {
    return <h1>Welcome to my React App</h1>;
}
*/

const root = createRoot(document.getElementById('root'));
root.render(<LocationsList />);

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
  
  
 
