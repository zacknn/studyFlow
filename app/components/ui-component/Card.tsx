import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Eye , Heart } from "lucide-react";
import Post from '@/types';
interface CardProps {
  post: Post
  onClick?: (id: string) => void
}

function Card({ post, onClick }: CardProps) {
  const typeColor = {
    tutorial: 'bg-blue-100 text-blue-800',
    reference: 'bg-purple-100 text-purple-800',
  }

  const displayType = (post.type as keyof typeof typeColor) || 'tutorial'

  return (
    <div
      onClick={() => onClick?.(post.id)}
      className="h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col cursor-pointer border border-gray-200 dark:bg-slate-800 dark:border-slate-700"
    >
      {/* Header with type badge */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 flex-1 line-clamp-2 dark:text-white">
          {post.title}
        </h3>
        {post.type && (
          <span
            className={`ml-2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
              typeColor[displayType]
            }`}
          >
            {post.type}
          </span>
        )}
      </div>

      {/* Description */}
      {post.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 dark:text-white">
          {post.description}
        </p>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 dark:text-white">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs dark:bg-slate-700 dark:text-slate-200"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Author and Metadata */}
      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
        <div className="flex-1">
          <p className="font-medium text-gray-700">
            {post.author?.name || 'Anonymous'}
          </p>
        </div>
        {!post.isPublic && (
          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
            Private
          </span>
        )}
      </div>

      {/* Footer with stats and date */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 mt-auto">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {post.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            {post.likes}
          </span>
        </div>
        <span title={post.createdAt.toString()}>
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  )
}

export default Card