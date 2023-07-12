import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Pokedex />} />
          <Route exact path="/:pokemonId" element={<Pokemon />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
