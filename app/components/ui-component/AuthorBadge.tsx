import Image from "next/image"

interface AuthorBadgeProps {
  author: {
    name: string | null
    image: string | null
  }
  createdAt?: Date
  size?: "sm" | "md"
}

export function AuthorBadge({ author, createdAt, size = "sm" }: AuthorBadgeProps) {
  const avatarSize = size === "sm" ? "w-6 h-6" : "w-8 h-8"
  const textSize = size === "sm" ? "text-xs" : "text-sm"

  return (
    <div className="flex items-center gap-2">
      {author.image ? (
        <Image
          src={author.image}
          alt={author.name ?? "User"}
          width={size === "sm" ? 24 : 32}
          height={size === "sm" ? 24 : 32}
          className={`${avatarSize} rounded-full object-cover border border-slate-200 dark:border-slate-700`}
        />
      ) : (
        <div className={`${avatarSize} rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0`}>
          <span className="text-white font-semibold" style={{ fontSize: size === "sm" ? 10 : 12 }}>
            {author.name?.charAt(0).toUpperCase() ?? "U"}
          </span>
        </div>
      )}
      <div>
        <p className={`${textSize} font-medium text-slate-700 dark:text-slate-300`}>
          {author.name ?? "Anonymous"}
        </p>
        {createdAt && (
          <p className="text-xs text-slate-400">
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  )
}