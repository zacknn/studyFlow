import type { FileUpload } from "../api/uploadthing/cors";
import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<FileUpload>();
