import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const f = createUploadthing();

export const FileUpload = {
  postFile: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
    image: { maxFileSize: "8MB", maxFileCount: 10 },
    text: { maxFileSize: "4MB", maxFileCount: 10 },
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: await headers() });

      if (!session?.user) throw new UploadThingError("Unauthorized");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
      return {
        url: file.ufsUrl,
        name: file.name,
        size: file.size,
        mimeType: file.type,
      };
    }),
} satisfies FileRouter;

export type FileUpload = typeof FileUpload;
