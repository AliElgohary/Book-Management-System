import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [years, setYears] = useState([]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      const fetchedBooks = response || [];
      setBooks(fetchedBooks);
      setFilteredBooks(fetchedBooks);
      extractYears(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setFilteredBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const extractYears = (books) => {
    const uniqueYears = Array.from(
      new Set(books.map((book) => new Date(book.publishedDate).getFullYear()))
    );
    setYears(uniqueYears.sort((a, b) => b - a));
  };

  const updateFilteredBooks = () => {
    let tempBooks = [...books];
    if (searchQuery.trim()) {
      tempBooks = tempBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterYear) {
      tempBooks = tempBooks.filter(
        (book) =>
          new Date(book.publishedDate).getFullYear().toString() === filterYear
      );
    }
    setFilteredBooks(tempBooks);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      const updatedBooks = books.filter((book) => book.id !== id); // Remove the deleted book from the state
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks); // Update the filtered list as well
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Trigger filtering whenever searchQuery or filterYear changes
  useEffect(() => {
    updateFilteredBooks();
  }, [searchQuery, filterYear, books]);

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />

        {/* Filter by Year Dropdown */}
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="p-2 border rounded w-1/3"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p>No books Available.</p>
      )}
    </div>
  );
};

export default BookList;
