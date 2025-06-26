import { CheckCircle, Gift, Globe, Heart, Terminal } from "lucide-react";

export default function HomePage() {
  const faqs = [
    {
      q: "Is Incode free to use?",
      a: "Yes! You can start practicing for free. Some advanced features may require an account.",
    },
    {
      q: "What topics can I practice?",
      a: "You can practice Docker, Git, Bash, and more. We’re adding new topics regularly.",
    },
    {
      q: "How does Incode help me learn?",
      a: "By typing real commands and code, you build muscle memory and confidence—much faster than passive reading.",
    },
    {
      q: "Can I track my progress?",
      a: "Yes! You’ll see your XP, badges, streaks, and detailed session stats.",
    },
  ];

  return (
    <main>
      {/* hero Section */}
      <section className="px-4 py-12 pb-12 mx-auto">
        <div className="text-center sm:text-left mx-auto">
          <p className="text-amber-400 mb-2 font-semibold tracking-wide text-center">Practice | Type | Master</p>
          <div className="py-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white text-center">
              PRACTICE REAL LIFE CODING
              <br />
              <span className="text-amber-400 text-center">with Incode</span>
            </h1>
          </div>

          <div className="max-w-6xl mx-auto block">
            <p className="text-lg mb-8 text-zinc-300  sm:mx-0 text-center">
              Forget syntax anxiety. Incode helps you master programming and CLI commands by{" "}
              <span className="text-amber-400 font-semibold text-center ">typing and practicing real-world code</span>
              —making you faster, more confident, and job-ready. Perfect for developers, DevOps, and anyone who wants to
              level up their command-line and coding skills.
            </p>
          </div>

          <div className=" flex gap-8 justify-center flex-wrap">
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

          <div className="flex  gap-4 justify-center my-8">
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

      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Who is Incode for?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <Terminal size={32} className="text-amber-400 mb-2" />
            <h3 className="font-semibold text-white mb-1">Junior Developers</h3>
            <p className="text-zinc-400 text-sm text-center">
              Learning new tech stacks or tools? Build confidence by practicing real code and commands.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <Gift size={32} className="text-amber-400 mb-2" />
            <h3 className="font-semibold text-white mb-1">Career Switchers</h3>
            <p className="text-zinc-400 text-sm text-center">
              Need rapid, muscle memory-based training? Incode makes it engaging and effective.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <Globe size={32} className="text-amber-400 mb-2" />
            <h3 className="font-semibold text-white mb-1">DevOps Enthusiasts</h3>
            <p className="text-zinc-400 text-sm text-center">
              Practice CLI tools like Docker, Git, Bash, and more—no more forgetting commands.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
            <Heart size={32} className="text-amber-400 mb-2" />
            <h3 className="font-semibold text-white mb-1">Instructors</h3>
            <p className="text-zinc-400 text-sm text-center">
              Recommend a modern, interactive training method to your students.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Practice Mode</h3>
            <p className="text-zinc-300 text-sm">
              Type real commands and code snippets. Get instant feedback and build muscle memory.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Battle Mode</h3>
            <p className="text-zinc-300 text-sm">Challenge yourself with no hints. Compete for XP and badges.</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Result Summary</h3>
            <p className="text-zinc-300 text-sm">
              See your typing speed, accuracy, XP, and mistakes after every session.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Profile & Streaks</h3>
            <p className="text-zinc-300 text-sm">
              Track your XP, badges, and recent practice results. Keep your streak alive!
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Topic Selection</h3>
            <p className="text-zinc-300 text-sm">
              Choose from topics like Docker, Git, Bash, and more. New topics added regularly.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="font-semibold text-amber-400 mb-2">Modern UI</h3>
            <p className="text-zinc-300 text-sm">Beautiful, distraction-free interface designed for focus and speed.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-zinc-900 rounded-lg p-4">
              <p className="flex justify-between items-center w-full text-left text-white">
                <span>{item.q}</span>
              </p>
              <div className="text-zinc-400 text-sm mt-2">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-4 py-8 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-sm text-zinc-400">&copy; {new Date().getFullYear()} Incode</div>
          <div className="text-sm text-zinc-400 flex gap-4">
            Build with ❤️ by{" "}
            <a className="hover:text-amber-500" href="https://github.com/raihan-hasan30">
              Raihan Hasan
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
