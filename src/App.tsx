import { Link, Route, Routes } from "react-router";
import './App.css';
import Home from "./features/home";
import Books from "./features/books";
import Categories from "./features/categories";
import IssuedBooks from "./features/issuedbooks";
import Members from "./features/members";
import Create from "./features/books/pages/Create";
import logo from "./assets/logo-removebg-preview.png";


function App() {
  return (
    <div>
<nav className="bg-blue-950 text-white shadow-md">
  <div className="w-full flex items-center justify-between px-6 py-3">

    {/* Left Side: Logo + Title */}
    <div className="flex items-center gap-4">
      <img
        src={logo}
        alt="SFA Logo"
        className="h-30 w-30 object-contain"  // Increased size
      />

      <h1 className="text-3xl font-bold tracking-wide">
        Library Management System
      </h1>
    </div>

    {/* Right Side: Navigation */}
    <div className="flex gap-6 text-sm font-medium">
      <Link className="hover:text-yellow-300 transition" to="/">
        Home
      </Link>
      <Link className="hover:text-yellow-300 transition" to="/books">
        Books
      </Link>
      <Link className="hover:text-yellow-300 transition" to="/categories">
        Categories
      </Link>
      <Link className="hover:text-yellow-300 transition" to="/issuedbook">
        Issued Books
      </Link>
      <Link className="hover:text-yellow-300 transition" to="/members">
        Members
      </Link>
      
    </div>

  </div>
</nav>
      <div className="p-6">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/books/*" element={<Books />} />
          <Route path="/categories/*" element={<Categories />} />
          <Route path="/issuedbook" element={<IssuedBooks />} />
          <Route path="/members" element={<Members />} />
          <Route path="/books/new" element={<Create />} /> {/* <-- Add this */}

        </Routes>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 max-w-7xl mx-auto px-6">
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-gray-500">Total Books</h2>
    <p className="text-2xl font-bold text-blue-800">1,250</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-gray-500">Issued Books</h2>
    <p className="text-2xl font-bold text-blue-700">320</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-gray-500">Members</h2>
    <p className="text-2xl font-bold text-blue-700">540</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-gray-500">Categories</h2>
    <p className="text-2xl font-bold text-blue-700">25</p>
  </div>
</div>
      <footer className="bg-blue-700 text-white mt-10 py-4 text-center">
  © 2026 SFA Library. All rights reserved.
</footer>
    </div>
    
    
  );
}


export default App
