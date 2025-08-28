"use client";

import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "../_services/use-categories-mutations";
import { useCategories } from "../_services/use-category-queries";
import { Edit, Trash } from "lucide-react";
import { alert } from "@/lib/use-global-store";

const CategoryCards = () => {
  const categoriesQuery = useCategories();
  const deleCategoryMutation = useDeleteCategory();

  return (
    <div className="grid grid-cols-4 gap-2">
      {categoriesQuery.data?.map((item) => (
        <div
          key={item.id}
          className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md"
        >
          <p className="truncate">{item.name}</p>
          <div className="flex gap-1">
            <Button
              className="size-6"
              variant={"ghost"}
              size={"icon"}
              onClick={() => {}}
            >
              <Edit />
            </Button>
            <Button
              className="size-6"
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                alert({
                  onConfirm: () => deleCategoryMutation.mutate(item.id),
                });
              }}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
