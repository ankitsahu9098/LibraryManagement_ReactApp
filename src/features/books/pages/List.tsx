import { useEffect, useState } from "react";
import { ApiService } from "../../../services";
import Loader from "../../../shared/components/loader";
import { Grid } from "../../../shared/components/grid";


interface Book {
  id: number;
  name: string;
  publisher: string;
  author: string;
  category: string;
}

export default function List() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    ApiService.get<Book[]>("/books")
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (books.length === 0) {
    return <div>No Books found.</div>;
  }

  return (
    <div className="overflow-x-auto">
    <Grid
      data={books}
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
              onClick: (b) => {
                console.log("Edit", b);
              },
            },
            {
              caption: "Delete",
              onClick: (b) => {
                console.log("Delete", b);
              },
            },
          ],
        },
      ]}
    />
  </div>
  
);
}