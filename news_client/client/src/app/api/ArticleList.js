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
          <p className="text-gray-600 line-clamp-2">
            {article.articleBody.length > 1000
              ? article.articleBody.substring(0, 100) + "..."
              : article.articleBody}
          </p>
          <img className="mt-3" src={article.image} alt="article Image" />

          <div className="absolute ml-2  bottom-2 text-sm text-gray-600">
            Date: {new Date(article.createdDate).toLocaleDateString('en-US')}
            <br />
            <span >Author: {article.authorName}</span>
          </div>




        </div>
      ))}
      {selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-8 max-w-3xl mx-auto max-h-1000
">
            <h2 className="text-xl font-bold text-blue-800 mb-2">{selectedArticle.articleTitle}</h2>
            <p className="text-gray-600 max-h-24 overflow-y-auto">{selectedArticle.articleBody}</p>
            <img className="mt-3" src={selectedArticle.image} alt="article Image" />

            <div className="absolute ml-2  bottom-2 text-sm text-gray-600">
              Date: {new Date(selectedArticle.createdDate).toLocaleDateString('en-US')}
              <br />
              <span >Author: {selectedArticle.authorName}</span>
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
