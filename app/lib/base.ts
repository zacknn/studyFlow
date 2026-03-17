import { oc } from "@orpc/contract";
import z from "zod";

export const base = oc.errors({
  UNAUTHORIZED: {
    status: 401,
    message: "authentication required",
  },
  FORBIDDEN: {
    status: 403,
    message: "you do not have permission to perform this action",
  },
  NOT_FOUND: {
    status: 404,
    message: "the requested resource was not found",
    data: z.object({
      resourceType: z.string(),
      resourceId: z.string(),
    }),
  },
  CONFLICT: {
    status: 409,
    message:
      "the request could not be completed due to a conflict with the current state of the resource",
  },
});

