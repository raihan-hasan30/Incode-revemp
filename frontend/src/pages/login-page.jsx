import { useState } from "react";
import { NavLink } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="bg-zinc-900 max-w-md w-full mx-auto p-4 rounded-md">
        <h2 className="text-center font-bold text-4xl mt-6">Login</h2>
        <form className="my-8 px-2" autoComplete="off">
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
          </div>

          <div className="mt-6">
            <button className="bg-amber-500 w-full px-4 py-2 rounded-md text-zinc-900" type="submit">
              Login
            </button>
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
