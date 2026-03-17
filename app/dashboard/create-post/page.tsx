"use client"
import { useCreatePost } from "@/app/lib/queries/post.queries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LinkEntry, FileEntry } from "@/app/types";
import { SectionCard } from "@/app/components/ui-component/create-poste/SectionCard";
import { BookOpen , ChevronDown , Globe , Lock , LinkIcon , Tag , FileText , Loader2 } from "lucide-react";
import { TagInput } from "@/app/components/ui-component/create-poste/TagInput";
import { LinksInput } from "@/app/components/ui-component/create-poste/LinksInputs";
import { FilesInput } from "@/app/components/ui-component/create-poste/FilesInputs";
export default function CreatePostPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreatePost();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"tutorial" | "reference" | "">("");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [links, setLinks] = useState<LinkEntry[]>([]);
  const [files, setFiles] = useState<FileEntry[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(
      {
        title,
        description: description || undefined,
        type: type || undefined,
        isPublic,
        tags,
        // note: file upload needs a separate endpoint (storage service)
        // links are handled by a separate endpoint too
        // for now we create the post then attach files/links
      },
      {
        onSuccess: (data) => {
          router.push(`/dashboard/post/${data.id}`);
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-rose-500 p-2 rounded-xl">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Create Post
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm ml-12">
            Share your notes, tutorials, or references with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Basic Info */}
          <SectionCard title="Basic Info" icon={<BookOpen className="w-4 h-4" />}>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">
                  Title <span className="text-rose-400">*</span>
                </label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Give your post a clear title"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400 transition"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="What is this post about?"
                  rows={4}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400 transition resize-none"
                />
              </div>
            </div>
          </SectionCard>

          {/* Type + Visibility */}
          <SectionCard title="Settings" icon={<ChevronDown className="w-4 h-4" />}>
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Type */}
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">
                  Type
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as "tutorial" | "reference" | "")}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400 transition"
                >
                  <option value="">No type</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="reference">Reference</option>
                </select>
              </div>

              {/* Visibility */}
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">
                  Visibility
                </label>
                <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setIsPublic(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition ${
                      isPublic
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Public
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPublic(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition ${
                      !isPublic
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Private
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Tags */}
          <SectionCard title="Tags" icon={<Tag className="w-4 h-4" />}>
            <TagInput tags={tags} onChange={setTags} />
          </SectionCard>

          {/* Links */}
          <SectionCard title="Links" icon={<LinkIcon className="w-4 h-4" />}>
            <LinksInput links={links} onChange={setLinks} />
          </SectionCard>

          {/* Files */}
          <SectionCard title="Files" icon={<FileText className="w-4 h-4" />}>
            <FilesInput files={files} onChange={setFiles} />
          </SectionCard>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !title.trim()}
              className="flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium flex items-center justify-center gap-2 transition"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}


