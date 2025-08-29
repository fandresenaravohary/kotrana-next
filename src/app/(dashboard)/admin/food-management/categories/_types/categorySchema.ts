import { z } from "zod";

const categorySchema = z.intersection(
  z.object({
    name: z.string()
           .min(1, { message: "Name is required" })
           .max(255, { message: "Name must be at most 255 characters" }),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1, { message: "ID must be greater than 0" }) }),
  ]),
);

type CategorySchema = z.infer<typeof categorySchema>;

const categoryDefaultValues: CategorySchema = {
  name: "",
  action: "create",
};

export { categorySchema, type CategorySchema, categoryDefaultValues };
