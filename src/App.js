import React, { useEffect, useState } from "react";
import './App.css';
import Weather from './Components/weather';


export default function App() {
  const [lat,setLat]=useState([]);
  const [long,setLong] = useState([]);
  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();

    //console.log("Latitude is:", lat)
   // console.log("Longitude is:", long)
  }, [lat, long])

  return (
    <div className="App">
    <Weather weatherData={data}/>
    </div>
  );
}


