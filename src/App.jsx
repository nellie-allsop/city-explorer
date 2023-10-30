import './App.css'
import axios from "axios"
import { useState } from 'react'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [location, setLocation] = useState({})
  const [search, setSearch] = useState("")
  const [map, setMap] = useState()

  function handleChange(event) {
    setSearch(event.target.value)
  }

  async function getLocation(event){
    event.preventDefault()

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`

    const res = await axios.get(API)

    setLocation(res.data[0])

    getMap(res.data[0].lat, res.data[0].lon)
  }

function getMap(lat, lon){

  const displayMap = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lon}&zoom=14&size=1000x1000&format=png&maptype=roadmap`

setMap(displayMap)
}

  return (
    <>
      <form onSubmit={getLocation}>
        <input onChange={handleChange} placeholder="City name" />
<button>Explore!</button>
      </form>

      <h2>{location.display_name}</h2>
      <p>{location.lat}</p>
      <p>{location.lon}</p>
      <img src={map} />
    </>
  )
 }

export default App

// https://maps.locationiq.com/v3/staticmap