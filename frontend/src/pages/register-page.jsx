import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { registerThunk } from "../redux/features/auth-slice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const naviate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      naviate("/game-list");
    }
  }, [user]);

  function handleRegister(e) {
    e.preventDefault();

    if (!name) {
      return showError("name", "You must provide your name");
    }

    if (!email) {
      return showError("email", "You must provide your Email");
    }

    if (!password) {
      return showError("password", "You must provide your password");
    }

    const data = { name, email, password, role: "user" };

    dispatch(registerThunk(data))
      .then((data) => {
        console.log(data);
        if (data?.email) {
          naviate("/game-list");
        }
      })
      .catch((e) => {
        showError("global", e?.message || "You must provide your Email");
      });
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
        <h2 className="text-center font-bold text-4xl mt-6">Register</h2>
        <form className="my-8 px-2" autoComplete="off" onSubmit={handleRegister}>
          <div className="my-6 flex flex-col gap-2">
            <label htmlFor="email">Name</label>
            <input
              type="name"
              id="name"
              placeholder="Write your name"
              value={name}
              className="px-4 py-2 rounded-md bg-zinc-700"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
            {error?.name && <div className="text-xs text-red-500">{error.name}</div>}
          </div>

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
            />
            {error?.email && <div className="text-xs text-red-500">{error.name}</div>}
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
            />
            {error?.password && <div className="text-xs text-red-500">{error.name}</div>}
          </div>

          <div className="mt-6">
            <button className="bg-amber-500 w-full px-4 py-2 rounded-md text-zinc-900" type="submit">
              Create Account
            </button>
            {error?.global && <div className="text-xs text-red-500 text-center py-2">{error.global}</div>}
          </div>
        </form>

        <p className="text-sm text-center text-zinc-500"> Or</p>

        <div className="text-center mx-auto block my-6">
          Already have account ?{" "}
          <NavLink className="text-amber-400" to={"/login"}>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}
