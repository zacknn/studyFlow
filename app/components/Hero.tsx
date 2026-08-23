export default function Hero() {
  return (
    <div className="relative text-center max-w-4xl mx-auto pt-8 md:pt-16">
      {/* Soft background glow behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-500/[0.04] dark:bg-rose-500/[0.07] rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-8">
        <h1
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-slate-900 dark:text-white animate-fade-in-up"
          style={{ opacity: 0 }}
        >
          Your personal{" "}
          <span className="relative inline-block group cursor-default">
            <span className="bg-rose-500 text-white px-4 py-1.5 rounded-2xl inline-block transform -rotate-1 shadow-2xl shadow-rose-500/25 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
              knowledge hub
            </span>
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.15s" }}
        >
          Organize your study materials, track your progress, and solve complex
          problems with our AI-powered voice assistant and document intelligence.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="mt-20 animate-fade-in-up"
        style={{ opacity: 0, animationDelay: "0.4s" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 mx-auto flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}