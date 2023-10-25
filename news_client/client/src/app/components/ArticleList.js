"use client";


import React, { useState, useEffect } from 'react';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/article/all');
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  const openArticleModal = (article) => {
    setSelectedArticle(article);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="w-3/4">
      {articles.map((article) => (
        <div key={article.articleId} className="mb-8 p-8 bg-white rounded shadow relative w-auto h-auto">
          <div className="absolute bottom-2 right-2">
            <button
              className="bg-blue-800 text-white p-2 rounded"
              onClick={() => openArticleModal(article)}
            >
              Read More...
            </button>
          </div>
          <h2 className="text-xl font-bold text-blue-800 mb-2">{article.articleTitle}</h2>
          <p className="text-base font-bold text-black line-clamp-3">{article.articleDescription}</p>
          <div className="text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{
            __html: article.articleBody.length > 1000
              ? article.articleBody.substring(0, 100) + "..."
              : article.articleBody
          }}></div>
          <div classname="flex justify-between flex-col text-gray-600 text-sm">
            <div className=" ml-2  bottom-2 text-gray-600 text-sm ">
              Date: {new Date(article.createdDate).toLocaleDateString('en-US')}
            </div>
            <div className='text-gray-600 text-sm'>Author: {article.authorName}</div>
          </div>
        </div>
      ))}
      {selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-8">
          <div className="bg-white p-8 rounded shadow-lg relative max-h-[70vh] overflow-y-auto w-[50vw]">
            <h2 className="text-xl font-bold text-blue-800 mb-2">{selectedArticle.articleTitle}</h2>
            <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: selectedArticle.articleBody }}></div>
            <div className="ml-2 mt-4 text-sm text-gray-600">
              Date: {new Date(selectedArticle.createdDate).toLocaleDateString('en-US')}
              <br />
              <span>Author: {selectedArticle.authorName}</span>
            </div>
            <button className="bg-blue-800 text-white p-2 rounded mt-4" onClick={closeArticleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
