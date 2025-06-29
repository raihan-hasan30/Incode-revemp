import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { loginThunk } from "../redux/features/auth-slice";

export default function LoginPage() {
  const naviate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user?.email) {
      naviate("/game-list");
    }
  }, [user]);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email) {
      return showError("email", "You must provide your Email");
    }

    if (!password) {
      return showError("password", "You must provide your password");
    }

    setLoading(true);

    try {
      const response = await dispatch(loginThunk({ email, password }));
      if (response.email) {
        naviate("/game-list");
      }
    } catch (error) {
      console.log(error.message);
      showError("global", error.message);
    }

    setLoading(false);
  }

  function showError(type, message) {
    const accepted = ["name", "email", "password", "global"];
    if (!accepted.includes(type)) {
      return;
    }

    setError((prev) => ({
      ...prev,
      [type]: message,
    }));

    setTimeout(() => setError({}), 5000);
  }

  return (
    <div>
      <div className="bg-zinc-900 max-w-md w-full mx-auto p-4 rounded-md">
        <h2 className="text-center font-bold text-4xl mt-6">Login</h2>
        <form className="my-8 px-2" autoComplete="off" onSubmit={handleLogin}>
          <div className="my-6 flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Write your valid email"
              value={email}
              className="px-4 py-2 rounded-md bg-zinc-700"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="my-6 flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Write your valid Password"
              value={password}
              className="px-4 py-2 rounded-md bg-zinc-700"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mt-6">
            <button disabled={loading} className="bg-amber-500 w-full px-4 py-2 rounded-md text-zinc-900" type="submit">
              Login
            </button>
            {error?.global && <div className="text-xs text-red-500 text-center py-8">{error.global}</div>}
          </div>
        </form>

        <p className="text-sm text-center text-zinc-500"> Or</p>

        <div className="text-center mx-auto block my-6">
          Don't have Account ?{" "}
          <NavLink className="text-amber-400" to={"/register"}>
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
}
