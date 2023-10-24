import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticleList from '../api/ArticleList';

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-4 overflow-auto bg-gray-200">
        <div className="flex justify-center items-center h-full">
          <ArticleList />
        </div>

      </main>

      < Footer className="hidden xl:block text-black" />
    </div>
  );
}
