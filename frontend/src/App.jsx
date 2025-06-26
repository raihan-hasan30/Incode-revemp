import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import GameList from "./pages/game-list-page";
import GamePage from "./pages/game-page";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-list" element={<GameList />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
