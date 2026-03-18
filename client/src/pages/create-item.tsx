import { CreateItemForm } from "@/components/items/create-item-form";

export function CreateItem() {
  return (
    <div className="container mx-auto flex max-w-5xl flex-col items-center px-4 py-8">
      <CreateItemForm />
    </div>
  );
}
