import { LinkIcon, MousePointer2, Mic, FileText, Sparkles } from "lucide-react";

export default function ServicesGrid() {
  return (
    <div className="relative">
      {/* Section header */}
      <div className="text-center mb-16 md:mb-20">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium mb-6 border border-rose-100 dark:border-rose-500/20 animate-fade-in-up"
          style={{ opacity: 0 }}
        >
          Features
        </span>
        <h2
          className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.1s" }}
        >
          Everything you need to excel
        </h2>
        <p
          className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.2s" }}
        >
          Powerful tools designed to make your study sessions more productive
          and engaging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Resource Management */}
        <div
          className="group animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.15s" }}
        >
          <div className="h-full border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-2 hover:border-rose-200 dark:hover:border-rose-500/30 transition-all duration-500 bg-white dark:bg-slate-900">
            <div className="h-64 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100 dark:group-hover:bg-slate-900 transition-colors duration-500">
              <div className="absolute inset-0 bg-grid-pattern dark:opacity-20 opacity-40" />

              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-48 h-32 rounded-xl shadow-lg flex flex-col p-3 gap-2 transform group-hover:scale-110 transition-transform duration-500">
                <div className="flex gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                <div className="h-2 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                <div className="mt-auto flex gap-2">
                  <div className="h-10 w-full bg-rose-50 dark:bg-rose-500/10 rounded-lg border border-rose-100 dark:border-rose-500/20 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-500/20 transition-colors">
                    <LinkIcon className="text-rose-500 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <MousePointer2 className="absolute -bottom-4 -right-4 w-8 h-8 text-slate-900 dark:text-white fill-slate-900 dark:fill-white transform -rotate-12 drop-shadow-lg z-10 stroke-white dark:stroke-slate-900 stroke-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold tracking-tight mb-3 text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                Resource Manager
              </h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Save courses, bookmark websites, and write detailed notes. Keep
                all your study links in one centralized dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: AI Voice Assistant */}
        <div
          className="group animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.3s" }}
        >
          <div className="h-full border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-2 hover:border-rose-200 dark:hover:border-rose-500/30 transition-all duration-500 bg-white dark:bg-slate-900">
            <div className="h-64 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100 dark:group-hover:bg-slate-900 transition-colors duration-500">
              <div className="absolute inset-0 bg-dot-pattern opacity-30 dark:opacity-20" />

              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-32 h-48 rounded-[2rem] shadow-lg flex flex-col items-center justify-center transform group-hover:-translate-y-3 transition-transform duration-500">
                <div className="absolute top-3 w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-200 dark:shadow-rose-900/30 group-hover:shadow-rose-300 dark:group-hover:shadow-rose-500/40 transition-shadow duration-500">
                  <Mic className="text-white w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="mt-4 flex gap-1">
                  <div className="w-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full animate-[bounce_1s_infinite_100ms]" />
                  <div className="w-1 h-5 bg-slate-400 dark:bg-slate-600 rounded-full animate-[bounce_1s_infinite_200ms]" />
                  <div className="w-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full animate-[bounce_1s_infinite_300ms]" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold tracking-tight mb-3 text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                AI Voice Tutor
              </h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Describe problems verbally. Our AI assistant listens, analyzes
                your query, and guides you through the solution with voice.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Document Chat */}
        <div
          className="group animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.45s" }}
        >
          <div className="h-full border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-2 hover:border-rose-200 dark:hover:border-rose-500/30 transition-all duration-500 bg-white dark:bg-slate-900">
            <div className="h-64 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100 dark:group-hover:bg-slate-900 transition-colors duration-500">
              <div className="absolute w-full h-full opacity-[0.4] dark:opacity-[0.1] bg-stripe-pattern" />

              <div className="relative flex items-center">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-32 h-40 rounded-lg shadow-md p-4 transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded mb-2" />
                  <div className="w-2/3 h-2 bg-slate-100 dark:bg-slate-800 rounded mb-2" />
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded mb-2" />
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded mb-2" />
                  <div className="mt-4 w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
                    <FileText className="text-emerald-500 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="absolute -right-8 top-8 bg-slate-900 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-white p-3 rounded-2xl rounded-bl-none shadow-xl transform rotate-3 group-hover:rotate-6 group-hover:translate-x-1 transition-all duration-500 max-w-[140px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3 h-3 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-xs font-medium text-slate-300">
                      Summary
                    </span>
                  </div>
                  <div className="h-1.5 w-20 bg-slate-700 dark:bg-slate-600 rounded mb-1" />
                  <div className="h-1.5 w-12 bg-slate-700 dark:bg-slate-600 rounded" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold tracking-tight mb-3 text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                Docu-Chat Intelligence
              </h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Upload PDFs or notes. Ask the chatbot to summarize topics,
                create quizzes, or answer specific questions instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}