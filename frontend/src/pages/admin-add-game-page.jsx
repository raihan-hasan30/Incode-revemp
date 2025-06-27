import { useRef, useState } from "react";

export default function AdminAddGamePage() {
  const logo = useRef(null);
  const [gameName, setGameName] = useState("");
  const [error, setError] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);

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

    fetch("/api/game/add-game", {
      method: "POST",
      body: formData,
    }).then((data) => {
      console.log("UPload status", data);
    });
  }

  function clearError() {
    setTimeout(() => {
      setError({});
    }, 5000);
  }

  return (
    <div className="p-6">
      <div className="p-8 bg-zinc-900/50 max-w-5xl mx-auto border border-zinc-300/20 rounded-md">
        <h1 className="text-center font-bold text-2xl">Add New Game</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 my-4">
            <label>Game Name</label>
            <input
              className="bg-zinc-100 p-2 rounded-md text-zinc-900"
              type="text"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              name="game_name"
              required
            />
            <p className="text-xs text-red-600">{error["game_name"]}</p>
          </div>

          <div className="gap-2 my-4">
            <label>Upload Logo</label>
            <br />
            <input
              className="bg-zinc-100 p-2 rounded-md text-zinc-900 w-fit"
              type="file"
              ref={logo}
              accept="image/*"
              onChange={handleLogoChange}
              name="game_logo"
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

          <button className="bg-amber-500 font-medium px-4 py-2 rounded-md text-zinc-800">Create</button>
        </form>
      </div>
    </div>
  );
}
