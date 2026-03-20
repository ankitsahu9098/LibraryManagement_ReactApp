import { useEffect, useState } from "react";
import Loader from "../../shared/components/loader";
import { ApiService } from "../../services";
import { Grid } from "../../shared/components/grid";

interface Book {
  id: number;
  name: string;
  publisher: string;
  author: string;
  category: string;
}

export default function Books() {
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

// <div className="overflow-x-auto">
//   <div className="bg-white shadow-gray-500 rounded-lg overflow-hidden">

//   <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
//     <thead className="bg-blue-500 text-white">
//       <tr>
//         <th className="px-6 py-3 text-left">Name</th>
//         <th className="px-6 py-3 text-left">Publisher</th>
//         <th className="px-6 py-3 text-left">Author</th>
//         <th className="px-6 py-3 text-left">Category</th>
//         <th className="px-6 py-3 text-left">Actions</th>
//       </tr>
//     </thead>

//     <tbody className="bg-white">
//       {books.map((book) => (
//         <tr
//           key={book.id}
//           className="border-b hover:bg-gray-100">
//           <td className="px-6 py-3">{book.name}</td>
//           <td className="px-6 py-3">{book.publisher}</td>
//           <td className="px-6 py-3">{book.author}</td>
//           <td className="px-6 py-3">{book.category}</td>
//           <td className="px-6 py-3">
//           <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
//           <button className="text-red-600 hover:text-red-800">Delete</button>
//         </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
