import CategoryFormDialog from "@/app/(dashboard)/_components/category-form-dialog";
import CategoryCards from "./_components/category-cards";

const Page = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Categories</h1>
        <CategoryFormDialog />
      </div>
      <CategoryCards />
    </>
  );
};

export default Page;
