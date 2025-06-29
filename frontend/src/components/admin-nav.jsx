import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router";

export default function AdminNav() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdmin = user?.role == "admin";
  const isLoggedIn = !!user?.email;

  function handleLogout() {
    if (!isLoggedIn) return;
    dispatch(logoutThunk());
  }

  useEffect(() => {
    if (!isAdmin) {
      navigate("/?msg=you are not allowed");
    }
  }, [isAdmin]);
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
          <li>
            <NavLink to={"/admin/add-game"}>Add Game</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/manage-game"}>Manage Game</NavLink>
          </li>
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
