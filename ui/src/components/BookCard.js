import React from 'react';

const BookCard = ({ book, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
      <p className="text-sm text-gray-400">Published: {book.publishedDate}</p>
      <p className="mt-4 text-lg text-gray-700">{book.description}</p>

      <button
        onClick={() => onDelete(book.id)}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default BookCard;
