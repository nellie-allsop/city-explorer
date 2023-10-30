import './App.css'
import axios from "axios"
import { useState } from 'react'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [location, setLocation] = useState({})
  const [search, setSearch] = useState("")

  function handleChange(event) {
    setSearch(event.target.value)
  }

  async function getLocation(event){
    event.preventDefault()

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`

    const res = await axios.get(API)

    setLocation(res.data[0])
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
    </>
  )
}

export default App
