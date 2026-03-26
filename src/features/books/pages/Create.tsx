import { Navigate, useNavigate } from "react-router";
import Form from "../components/Form";
import { useNewStateMutation } from "../queries";
import { useEffect, useState } from "react";
import { ApiService } from "../../../services";

export default function Create() {
  const { mutateAsync } = useNewStateMutation();
  const navigate = useNavigate();
  // const [categories, setCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Master.CategoryItem[]>([]);

  // Fetch categories from API
  useEffect(() => {
    ApiService.get<Master.CategoryItem[]>("/categories").then((res) => {
      setCategories(res); // convert to string[]
    });
  }, []);

  if (categories.length === 0) {
    return <div className="text-center mt-20">Loading categories...</div>;
  }
  return (
    <Form
      submitCaption="Create"
categories={categories}
      onSubmit={async (state) => {
        await mutateAsync(state);
        navigate("/books");
      } }    />
  );
}
