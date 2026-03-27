import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "../../../shared/components/buttons";
import { useEffect } from "react";

interface FormProps {
  onSubmit: (p: Master.BookForm) => Promise<void>;
  onLoad?: () => Promise<Master.BookItem>;
  submitCaption: string;
  categories: { id: number; name: string }[];
}

export default function Form({
  onLoad,
  onSubmit,
  categories,
  ...props
}: FormProps) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset  } = useForm<Master.BookForm>({
    defaultValues: {},
  });
useEffect(() => {
    if (onLoad) {
      onLoad().then((data) => {
        reset(data);
      });
    }
  }, [onLoad, reset]);
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
          console.log(data);
          navigate("../books");
        })}
      >
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm mb-1">Book Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter Book Name"
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm mb-1">Book Price</label>
          <input
            type="text"
            step="0.01"
            {...register("price", { valueAsNumber: true ,required: "Price is required"})}
            placeholder="Enter Book Price"
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm mb-1">Publisher</label>
          <input
            type="text"
            {...register("publisher")}
            placeholder="Enter Publisher"
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 text-sm mb-1">Author</label>
          <input
            type="text"
            {...register("author")}
            placeholder="Enter Author"
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 text-sm mb-1">Category</label>
          <select
  {...register("categoryId", { valueAsNumber: true })}
  className="w-full border rounded-md px-3 py-2"
>
  <option value="">Select Category</option>
  {categories.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>
        </div>

        <Button
          caption={props.submitCaption}
          disabled={formState.isSubmitting}
        />
      </form>
    </div>
  );
}
