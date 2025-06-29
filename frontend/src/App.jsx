import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import AdminNav from "./components/admin-nav";
import Navbar from "./components/navbar";
import AdminAddGamePage from "./pages/admin-add-game-page";
import AdminEditGamePage from "./pages/admin-edit-game-page";
import GameManagerPage from "./pages/admin-games-manager";
import GameList from "./pages/game-list-page";
import GamePage from "./pages/game-page";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import { revalidate } from "./redux/features/auth-slice";

function App() {
  const dispatch = useDispatch();

  // Authenticate
  useEffect(() => {
    dispatch(revalidate());
  }, []);

  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-list" element={<GameList />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<AdminNav />}>
        <Route path="/admin/add-game" element={<AdminAddGamePage />} />
        <Route path="/admin/manage-game" element={<GameManagerPage />} />
        <Route path="/admin/edit-game/:gameId" element={<AdminEditGamePage />} />
      </Route>
    </Routes>
  );
}

export default App;
