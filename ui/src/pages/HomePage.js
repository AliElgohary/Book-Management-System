import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshBookList = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Bookstore</h1>
      </header>
      <main className="container mx-auto py-6">
        <div className="lg:flex lg:space-x-8">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <BookForm onBookAdded={refreshBookList} />
          </div>
          <div className="lg:w-1/2 w-full">
            <BookList key={refresh} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
