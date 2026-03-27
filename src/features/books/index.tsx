import { Navigate, Route, Routes } from "react-router"
import List from "./pages/List";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

export default function Books() {
  return (
  <Routes>
    <Route index element={<Navigate to="books" />} />
    <Route path="books" element={<List />} />
    <Route path="new" element={<Create />} />
    <Route path="edit/:bookId" element={<Edit />} />

  </Routes>
  );
};

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
