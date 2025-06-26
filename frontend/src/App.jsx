import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import GameList from "./pages/game-list-page";
import HomePage from "./pages/home-page";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-list" element={<GameList />} />
      </Route>
    </Routes>
  );
}

export default App;
