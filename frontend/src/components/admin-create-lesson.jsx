import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function AdminCreateLesson() {
  const { gameId } = useParams();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [existingLessons, setExistingLessons] = useState([]);
  const [fromData, setFormData] = useState({
    lessonName: "",
    cmd: "",
  });

  useEffect(() => {
    fetch(`/api/lesson/${gameId}`)
      .then((res) => res.json())
      .then((data) => {
        setExistingLessons(data);
      })
      .catch((err) => {
        setError({ global: err.message });
      });
  }, []);

  function handleCreateLesson(e) {
    e.preventDefault();

    fetch("/api/lesson/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...fromData, gameId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setExistingLessons((prev) => [...prev, data]);
      });
  }

  if (error?.global) {
    return <div className="text-red-500 p-4 text-center">{error.global}</div>;
  }

  return (
    <div className="my-6 p-8 bg-zinc-900/50 max-w-5xl mx-auto border border-zinc-300/20 rounded-md">
      <div className="grid grid-cols-2 gap-2">
        <div className="p-4">
          <h3>Create Lesson</h3>

          <form onSubmit={handleCreateLesson}>
            <div className="flex flex-col gap-2 my-4">
              <label>Lesson Name</label>
              <input
                className="bg-zinc-100 p-2 rounded-md text-zinc-900 disabled:bg-zinc-600"
                type="text"
                placeholder="Your Game name"
                value={fromData.lessonName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lessonName: e.target.value }))}
                name="lessonName"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-red-600">{error["game_name"]}</p>
            </div>

            <div className="flex flex-col gap-2 my-4">
              <label>Command</label>
              <input
                className="bg-zinc-100 p-2 rounded-md text-zinc-900 disabled:bg-zinc-600"
                type="text"
                placeholder="Your Game name"
                value={fromData.cmd}
                onChange={(e) => setFormData((prev) => ({ ...prev, cmd: e.target.value }))}
                name="cmd"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-red-600">{error["game_name"]}</p>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-green-500 font-medium px-4 py-2 text-white rounded-md disabled:bg-green-900"
            >
              Create
            </button>
          </form>
        </div>

        {/* Existing Lesson List */}
        <div className="p-4">
          <h3 className="my-4 font-bold">Lessons</h3>

          <div className="space-y-4">
            {existingLessons.length &&
              existingLessons.map((lesson) => {
                return (
                  <div className="flex" key={lesson.id}>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300">{lesson.lessonName}</p>
                      <p className="text-xs text-zinc-500">{lesson.cmd}</p>
                    </div>
                    <div className="space-x-3">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-amber-500 text-sm px-2 py-1 rounded-md text-zinc-800 disabled:bg-amber-900"
                      >
                        Update
                      </button>

                      <button
                        disabled={isLoading}
                        type="button"
                        className="bg-red-500  text-sm px-2 py-1 rounded-md text-zinc-100 disabled:bg-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
