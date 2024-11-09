import React, { useState } from "react";
import { createBook } from "../services/bookService";

const BookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, publishedDate, description };

    try {
      await createBook(bookData);
      setTitle("");
      setAuthor("");
      setPublishedDate("");
      setDescription("");
      setErrorMessage("");
      onBookAdded();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {errorMessage && (
        <div className="text-red-500 bg-red-100 p-2 rounded">
          {errorMessage}
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
