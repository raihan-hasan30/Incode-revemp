import { CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <section className="px-4 pt-8 pb-12 mx-auto">
        <div className="text-center sm:text-left">
          <p className="text-amber-400 mb-2 font-semibold tracking-wide">Practice. Type. Master.</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Build Muscle Memory for Real-World Coding
            <br />
            <span className="text-amber-400">with Incode</span>
          </h1>

          <p className="text-lg mb-8 max-w-2xl text-zinc-300 mx-auto sm:mx-0">
            Forget syntax anxiety. Incode helps you master programming and CLI commands by{" "}
            <span className="text-amber-400 font-semibold">typing and practicing real-world code</span>—making you
            faster, more confident, and job-ready. Perfect for developers, DevOps, and anyone who wants to level up
            their command-line and coding skills.
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-6 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-amber-400" />
              <span>Practice Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-amber-400" />
              <span>Battle Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-amber-400" />
              <span>Instant Feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-amber-400" />
              <span>XP, Badges & Streaks</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <a
              href="/register"
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-full px-6 py-2 flex items-center gap-2 shadow-lg transition-all"
            >
              Get Started Free <span className="ml-1">→</span>
            </a>
            <a
              href="/quest-list"
              className="border border-zinc-700 rounded-full px-6 py-2 hover:bg-zinc-800 text-white transition-all"
            >
              Browse Quests
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
