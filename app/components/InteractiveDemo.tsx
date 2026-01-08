import { Bot, UploadCloud, Mic, MoreHorizontal, Send } from "lucide-react";

export default function InteractiveDemo() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 mb-32 relative overflow-hidden transition-colors">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium border border-transparent dark:border-rose-500/20">
            <Bot className="w-4 h-4" />
            <span>AI Assistant Live Demo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            "Explain quantum entanglement like I'm five."
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Experience the power of our context-aware AI. Whether it's analyzing uploaded lecture slides or answering voice queries, help is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-medium transition-all shadow-sm">
              <UploadCloud className="w-5 h-5" />
              Upload Document
            </button>
            <button className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md shadow-rose-200 dark:shadow-none">
              <Mic className="w-5 h-5" />
              Start Voice Mode
            </button>
          </div>
        </div>
        
        {/* Chat Interface Mockup */}
        <div className="flex-1 w-full max-w-md">
          <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">StudyBot 2.0</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </div>
            <div className="p-6 space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-rose-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                  Summarize the main points of the attached PDF regarding photosynthesis.
                </div>
              </div>
              {/* AI Message */}
              <div className="flex justify-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">
                  <p className="mb-2 font-medium">Here's the summary:</p>
                  <ul className="list-disc list-inside space-y-1 opacity-80">
                    <li>Light-dependent reactions occur in thylakoids.</li>
                    <li>Calvin cycle takes place in the stroma.</li>
                    <li>ATP and NADPH are key energy carriers.</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Input Area */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
              <div className="relative">
                <input type="text" placeholder="Ask a follow-up question..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 dark:focus:border-rose-500 transition-colors" />
                <button className="absolute right-2 top-2 p-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}