"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  categoryDefaultValues,
  categorySchema,
  CategorySchema,
} from "../admin/food-management/categories/_types/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoriesStore } from "../admin/food-management/categories/_libs/use-category-store";
import { useCategory } from "../admin/food-management/categories/_services/use-category-queries";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../admin/food-management/categories/_services/use-categories-mutations";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ControlledInput } from "@/components/ui/controlled-input";
import { useEffect } from "react";

type CategoryFormDialogProps = {
  smallTrigger?: boolean;
};

const CategoryFormDialog = ({ smallTrigger }: CategoryFormDialogProps) => {
  const form = useForm<CategorySchema>({
    defaultValues: categoryDefaultValues,
    resolver: zodResolver(categorySchema),
  });

  const {
    selectedCategoryId,
    updateSelectedCategoryId,
    categoryDialogOpen,
    updateCategoryDialogOpen,
  } = useCategoriesStore();

  const categoryQuery = useCategory();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const isPending =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;

  useEffect(() => {
    if (selectedCategoryId && categoryQuery.data) {
      form.reset(categoryQuery.data);
    }
  }, [categoryQuery.data, form, selectedCategoryId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateCategoryDialogOpen(open);

    if (!open) {
      updateSelectedCategoryId(null);
      form.reset(categoryDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<CategorySchema> = (data) => {
    if (data.action === "create") {
      createCategoryMutation.mutate(data, { onSuccess: handleSuccess });
    } else {
      updateCategoryMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  return (
    <Dialog open={categoryDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size={"icon"} variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedCategoryId ? "Edit Category" : "Create a new Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            <ControlledInput<CategorySchema>
              name="name"
              label="Name"
              placeholder="Enter category name"
            />
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedCategoryId ? "Edit" : "create"} Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
