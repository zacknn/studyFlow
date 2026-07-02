import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownProps {
  text: string
  className?: string
}

export function Markdown({ text, className }: MarkdownProps) {
  return (
    <div className={cn("text-sm leading-relaxed", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            return (
              <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto my-2">
                {children}
              </pre>
            )
          },
          code({ className: codeClass, children, ...props }) {
            const isInline = !codeClass
            return isInline ? (
              <code className="bg-slate-800 text-rose-300 px-1 py-0.5 rounded text-xs" {...props}>
                {children}
              </code>
            ) : (
              <code className={cn("text-sm text-slate-200", codeClass)} {...props}>
                {children}
              </code>
            )
          },
          ul({ children }) {
            return <ul className="list-disc pl-4 my-2 space-y-1">{children}</ul>
          },
          ol({ children }) {
            return <ol className="list-decimal pl-4 my-2 space-y-1">{children}</ol>
          },
          li({ children }) {
            return <li className="text-slate-300">{children}</li>
          },
          h1({ children }) {
            return <h1 className="text-lg font-bold text-white mt-4 mb-2">{children}</h1>
          },
          h2({ children }) {
            return <h2 className="text-base font-semibold text-white mt-3 mb-2">{children}</h2>
          },
          h3({ children }) {
            return <h3 className="text-sm font-medium text-slate-200 mt-2 mb-1">{children}</h3>
          },
          p({ children }) {
            return <p className="text-slate-300 leading-relaxed mb-2">{children}</p>
          },
          strong({ children }) {
            return <strong className="text-white font-semibold">{children}</strong>
          },
          em({ children }) {
            return <em className="text-slate-200 italic">{children}</em>
          },
          a({ children, href }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:text-rose-300 underline">
                {children}
              </a>
            )
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-rose-500/50 pl-3 my-2 text-slate-400 italic">
                {children}
              </blockquote>
            )
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-2">
                <table className="w-full text-left text-xs border border-slate-700 rounded-lg">
                  {children}
                </table>
              </div>
            )
          },
          thead({ children }) {
            return <thead className="bg-slate-800 text-slate-200">{children}</thead>
          },
          th({ children }) {
            return <th className="px-3 py-2 border-b border-slate-700 font-medium">{children}</th>
          },
          td({ children }) {
            return <td className="px-3 py-2 border-b border-slate-800 text-slate-300">{children}</td>
          },
          hr() {
            return <hr className="border-slate-700 my-3" />
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}