import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import { logoutThunk } from "../redux/features/auth-slice";

export default function Navbar() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isAdmin = user?.role == "admin";
  const isLoggedIn = !!user?.email;

  function handleLogout() {
    console.log(user);
    if (!isLoggedIn) return;
    dispatch(logoutThunk());
  }

  return (
    <>
      <nav className="flex justify-between py-6 px-4 max-w-7xl mx-auto mb-8">
        <NavLink to={"/"} className="flex items-center">
          <img src="/images/logo.svg" alt="incode" className="h-8" />
        </NavLink>
        <ul className="flex gap-4">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink to={"/admin/manage-game"}>Admin</NavLink>
            </li>
          )}
          <li>
            <NavLink to={"/game-list"}>Game List</NavLink>
          </li>
          {!isLoggedIn ? (
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          ) : (
            <li className="cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
