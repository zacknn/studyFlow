import { createRouteHandler } from "uploadthing/next";
import { FileUpload } from "./cors";

export const {GET , POST} = createRouteHandler({
    router: FileUpload,
})