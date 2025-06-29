import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AdminCreateLesson from "../components/admin-create-lesson";

export default function AdminEditGamePage() {
  const logo = useRef(null);
  const games = useSelector((state) => state.games);
  const [gameName, setGameName] = useState("");
  const [error, setError] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const { gameId } = useParams();

  useEffect(() => {
    if (gameId) {
      fetch(`/api/game/${gameId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            return setError({
              global: data.error,
            });
          }

          setGameName(data.name);
          setLogoPreview(data.logo);
        });
    }
  }, [gameId]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    logo.current = file;
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setLogoPreview(null);
    }
  };

  function removeImage(e) {
    e.preventDefault();

    logo.current = null;
    setLogoPreview(null);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!gameName || gameName == "") {
      setError({
        ...error,
        game_name: "Please Provide your Game Name",
      });
      clearError();
      return;
    }
    if (!logoPreview) {
      setError({
        ...error,
        game_logo: "Please Select Logo",
      });
      clearError();
      return;
    }

    const formData = new FormData();
    formData.set("game_name", gameName);
    formData.set("logo", logo.current);

    setIsLoading(true);
    fetch("/api/game/" + gameId, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setResponse("Uploaded Successfully");
        clearError();
      });
  }

  function handleDelete() {}

  function clearError() {
    setTimeout(() => {
      setError({});
    }, 5000);
  }

  function clearError() {
    setTimeout(() => {
      setResponse(null);
      navigate("/admin/manage-game");
    }, 5000);
  }

  if (error?.global) {
    return <div className="text-red-500 p-4 text-center">{error.global}</div>;
  }

  return (
    <div className="p-6">
      <div className="p-8 bg-zinc-900/50 max-w-5xl mx-auto border border-zinc-300/20 rounded-md">
        <h1 className="text-center font-bold text-2xl">Edit New Game</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 my-4">
            <label>Game Name</label>
            <input
              className="bg-zinc-100 p-2 rounded-md text-zinc-900 disabled:bg-zinc-600"
              type="text"
              placeholder="Your Game name"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              name="game_name"
              disabled={isLoading}
              required
            />
            <p className="text-xs text-red-600">{error["game_name"]}</p>
          </div>

          <div className="gap-2 my-4">
            <label>Upload Logo</label>
            <br />
            <input
              className="bg-zinc-100 p-2 rounded-md text-zinc-900 w-fit disabled:bg-zinc-600"
              type="file"
              ref={logo}
              accept="image/*"
              onChange={handleLogoChange}
              name="game_logo"
              disabled={isLoading}
              required
            />
            <p className="text-xs text-red-600">{error["game_logo"]}</p>

            {logoPreview && (
              <div onClick={removeImage} className="relative ">
                <button className="absolute right-1 top-1">X</button>
                <img src={logoPreview} alt="Logo Preview" className="w-full mt-4 max-h-40 object-contain" />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-amber-500 font-medium px-4 py-2 rounded-md text-zinc-800 disabled:bg-amber-900"
            >
              Update
            </button>

            <button
              disabled={isLoading}
              type="button"
              onClick={handleDelete}
              className="bg-red-500  font-medium px-4 py-2 rounded-md text-zinc-100 disabled:bg-red-900"
            >
              Delete
            </button>
          </div>
        </form>
        <p className="text-xs text-red-600">{error["global"]}</p>
        {response && <p className="text-xs text-green-600 py-8">{response}</p>}
      </div>

      <AdminCreateLesson />
    </div>
  );
}
