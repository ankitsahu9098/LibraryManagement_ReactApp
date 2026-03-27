import { useEffect, useState } from "react";
import { ApiService } from "../../../services";
import Loader from "../../../shared/components/loader";
import { Grid } from "../../../shared/components/grid";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useBooksQuery, useRemoveBookMutation } from "../queries";


interface Book {
  id: number;
  name: string;
  publisher: string;
  author: string;
  category: string;
}

export default function List() {
  // const [loading, setLoading] = useState(true);
  // const [books, setBooks] = useState<Book[]>([]);
  const {data=[], isLoading} =useBooksQuery();
  const {isPending, mutateAsync }= useRemoveBookMutation(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   ApiService.get<Book[]>("/books")
  //     .then(setBooks)
  //     .finally(() => setLoading(false));
  // }, []);

  if (isLoading || isPending ) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <div>No Books found.</div>;
  }

  return (
    <div className="overflow-x-auto">
       <div className="flex justify-end mb-4">
        <Link
          to="/books/new"
          className="bg-blue-900 text-amber-50 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
        >
          Add New Book
        </Link>
      </div>
    <Grid
      data={data}
      columns={[
        {
          field: "name",
          header: "Name",
        },
        {
          field: "publisher",
          header: "Publisher",
        },
        {
          field: "author",
          header: "Author",
        },
        {
          field: "category",
          header: "Category",
        },
        {
          header: "Actions",
          actions: [
            {
              caption: "Edit",
              onClick: async data =>
              {
                navigate(`../edit/${data.id}`);
                
              
              },
            },
            {
              caption: "Delete",
              onClick: async data => {
                if (window.confirm("Are you sure you want to delete?")){
                await mutateAsync(data.id);
                navigate('/books')
              }},
            },
          ],
        },
      ]}
    />
  </div>
  
);
}