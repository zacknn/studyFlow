interface PostsErrorProps {
  message?: string
  onRetry?: () => void
}

export default function PostsError({ message, onRetry }: PostsErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="bg-rose-100 dark:bg-rose-900/20 p-4 rounded-full">
        <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <div>
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Something went wrong
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {message ?? "We couldn't load the posts. Please try again."}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-5 py-2 text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:opacity-80 transition"
        >
          Try again
        </button>
      )}
    </div>
  )
}