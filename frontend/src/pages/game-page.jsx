import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function GamePage() {
  const { gameId } = useParams();
  const [text, setText] = useState("");
  const [current, setCurrent] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user?.email) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (lessons.length > 0) return;

    setLoading(true);
    fetch("/api/lesson/" + gameId)
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
      })
      .catch((err) => showError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handleKeydown(e) {
      e.preventDefault();

      if (e.key == "Tab" && lessons.length > current + 1) {
        setCurrent((prev) => prev + 1);
        setText("");
      }

      if (lessons[current]?.cmd.length <= text.length) {
        return;
      }

      if (e.key === "Backspace") {
        setText((previous) => previous.slice(0, -1));
      }

      if (e.key.length == 1) {
        const newText = e.key;
        setText((previous) => previous + newText);
      }
    }
    document.addEventListener("keydown", handleKeydown);

    if (lessons.length - 1 == current && text.length == lessons[lessons.length - 1].cmd.length) {
      showSuccessMessag();
      document.removeEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [text]);

  function showError(message) {
    setError(message);
    setTimeout(() => setError(null), 5000);
  }

  function showSuccessMessag() {
    setMessage("🎊 Congratulations !! You have completed Your Lesson");

    setTimeout(() => {
      setMessage("");
      setCurrent(0);
      setText("");
    }, 5000);
  }

  if (loading) {
    return <div className="p-6 text-center bg-zinc-700 text-green-500">Please wait Game is Loading</div>;
  }

  if (error) {
    return <div className="p-6 text-center bg-zinc-700 text-red-500">{error}</div>;
  }

  if (lessons.length == 0) {
    return <div className="p-6 text-center bg-zinc-700 text-amber-500">There is No lesson for this game</div>;
  }

  return (
    <>
      {message && (
        <div className="max-w-4xl mx-auto text-center p-4 bg-zinc-900 py-12 rounded-md text-emerald-500 font-medium leading-relaxed">
          {message}
        </div>
      )}

      <div className="max-w-6xl p-4 mx-auto flex gap-4">
        {/* Lesson List Area */}
        <div className="w-3/12 p-4 bg-zinc-800/40 rounded-md border border-white/20">
          <h2 className="font-bold text-xl">Lessons</h2>

          {lessons.map((lesson, index) => {
            return (
              <div
                className="p-3 text-amber-500 bg-zinc-900 my-2 rounded-md cursor-pointer hover:bg-zinc-800"
                key={index}
                onClick={() => setCurrent(index)}
              >
                {index === current && "➡️ "}
                {lesson.lessonName.slice(0, 8)}
                {"..."}
              </div>
            );
          })}
        </div>

        {/* Game Area */}
        <div className=" flex-1 p-4 bg-zinc-800/40 rounded-md border border-white/20">
          <h1 className="text-3xl font-bold text-center my-4">{lessons[current].lessonName}</h1>

          <span className="text-sm text-zinc-400">Typing Area</span>
          <div className="text-xl font-medium py-12 rounded-md bg-zinc-800/50 max-w-4xl mx-auto my-2 text-center">
            {lessons[current]?.cmd.split("").map((char, index) => {
              const textMatch = lessons[current]?.cmd[index] === text[index];
              let textColor = textMatch ? "text-green-500" : "text-red-500";
              if (text[index] === undefined) textColor = "text-zinc-500";

              return (
                <span key={char + index} className={textColor}>
                  {char}
                </span>
              );
            })}

            {lessons[current]?.cmd.length == text.length && (
              <div className="ml-4 inline text-xs text-blue-400 bg-blue-700/20 px-3 py-2 rounded-md pointer-none select-none">
                Tab
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
