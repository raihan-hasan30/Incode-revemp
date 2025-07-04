import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addGame } from "../redux/features/game-slice";

export default function AdminAddGamePage() {
  const logo = useRef(null);
  const [gameName, setGameName] = useState("");
  const [error, setError] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    console.log(gameName);

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
    fetch("/api/game/add-game", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw error;
        }

        return await res.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        dispatch(addGame(data));
        setIsLoading(false);
        setResponse("Uploaded Successfully, Navigating to Add Lesson Page...");
        clearError();
        setGameName("");
        setLogoPreview(null);
        logo.current.value = "";

        setTimeout(() => {
          navigate("/admin/edit-game/" + data.id);
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setError({
          global: error.error,
        });
        clearError();
      });
  }

  function clearError() {
    setTimeout(() => {
      setError({});
    }, 5000);
  }

  // function clearError() {
  //   setTimeout(() => {
  //     setResponse(null);
  //     navigate("/admin/manage-game");
  //   }, 5000);
  // }

  return (
    <div className="p-6">
      <div className="p-8 bg-zinc-900/50 max-w-5xl mx-auto border border-zinc-300/20 rounded-md">
        <h1 className="text-center font-bold text-2xl">Add New Game</h1>
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
              <div onClick={removeImage} className="relative">
                <button className="absolute right-1 top-1">X</button>
                <img src={logoPreview} alt="Logo Preview" className="w-full mt-4 max-h-64 object-contain" />
              </div>
            )}
          </div>

          <button
            disabled={isLoading}
            className="bg-amber-500 font-medium px-4 py-2 rounded-md text-zinc-800 disabled:bg-amber-900"
          >
            Create
          </button>
        </form>
        <p className="text-xs text-red-600">{error["global"]}</p>
        {response && <p className="text-xs text-green-600 py-8">{response}</p>}
      </div>
    </div>
  );
}
