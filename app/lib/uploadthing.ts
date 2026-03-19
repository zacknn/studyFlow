import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react"
import type { FileUpload } from "../api/uploadthing/cors"
import { generateReactHelpers } from "@uploadthing/react"

export const UploadButton = generateUploadButton<FileUpload>()
export const UploadDropzone = generateUploadDropzone<FileUpload>()
export const { useUploadThing, uploadFiles } = generateReactHelpers<FileUpload>()