import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { thunkDeleteGame, thunkFetchGames } from "../redux/features/game-slice";

export default function GameManagerPage() {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!games.length) dispatch(thunkFetchGames());
  }, []);

  if (!games.length) {
    return <div className="bg-zinc-600 p-10">No Game Found</div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="font-bold text-center text-2xl my-8">Manage Games</h1>

        {games.map((game) => {
          function handleDelete() {
            if (confirm("Are you sure ?")) {
              dispatch(thunkDeleteGame(game.id));
            }
          }
          return (
            <div key={game.id} className="flex items-center gap-4 border border-white/30 p-4 rounded-md">
              <img
                src={game.logo}
                className="w-10 h-10 bg-white  rounded-md object-contain  shadow-lg transition-all duration-300"
                alt={game.name}
              />

              <p className="text-white flex-10/12 tracking-tight  transition-colors">{game.name}</p>

              <div className="space-x-4 flex">
                <Link to={`/admin/edit-game/${game.id}`} className="bg-green-500 px-4 py-2 rounded-md">
                  Edit
                </Link>
                <button onClick={handleDelete} className="bg-red-500 px-4 py-2 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
