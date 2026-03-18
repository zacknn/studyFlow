import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react"
import type { FileUpload } from "../api/uploadthing/cors"

export const UploadButton = generateUploadButton<FileUpload>()
export const UploadDropzone = generateUploadDropzone<FileUpload>()
