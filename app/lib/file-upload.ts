const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".txt",
  ".md",
  ".csv",
])

export const ACCEPTED_UPLOAD_DESCRIPTION =
  "PDF, images, and plain text files only. Source code and other file types are not supported."

export function isAllowedUploadFile(file: Pick<File, "name">): boolean {
  const extension = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
    : ""

  return ALLOWED_UPLOAD_EXTENSIONS.has(extension)
}

export function getUnsupportedUploadFiles(files: File[]): File[] {
  return files.filter((file) => !isAllowedUploadFile(file))
}
