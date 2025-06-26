import { NavLink, Outlet } from "react-router";

export default function Navbar() {
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
            <NavLink to={"/game-list"}>Game List</NavLink>
          </li>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
