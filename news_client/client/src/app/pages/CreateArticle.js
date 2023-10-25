"use client";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateArticle() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleBody, setArticleBody] = useState("<p>Initial content here</p>");
  const [authorName, setAuthorName] = useState("");
  const { quill, quillRef } = useQuill({ value: articleBody });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setArticleBody(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const saveArticleData = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/article/save", data);
      if (response.status === 200) {
        console.log("Article data saved successfully.");
        toast.success("Article data saved successfully.", { autoClose: 3000 });
        setArticleTitle("");
        setArticleDescription("");
        setArticleBody("<p>Initial content here</p>");
        setAuthorName("");
        if (quill) {
          quill.setText('');
        }
      } else {
        toast.error("Failed to save article.", { autoClose: 3000 });
        console.error("Failed to save article data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = () => {
    const createdDate = new Date();
    const articleData = {
      articleTitle,
      articleDescription,
      articleBody,
      createdDate,
      authorName,
    };
    console.log(articleData);
    saveArticleData(articleData);
  };

  return (
    <div className="flex flex-col  min-h-screen bg-white  py-2">
      <div className="w-full max-w-2xl bg-gray-200 p-8 rounded">
        <h1 className="text-2xl mb-4 text-2xl font-semibold text-blue-600">Create New Article</h1>

        <input
          className="w-full p-2 mb-4 border rounded text-black"
          placeholder="Article Title"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 border rounded text-black"
          placeholder="Article Description"
          value={articleDescription}
          onChange={(e) => setArticleDescription(e.target.value)}
        />

        <div className="mb-2 text-black">
          <div ref={quillRef} />
        </div>

        <input
          className="w-full p-2 mb-4 border rounded text-black"
          placeholder="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <button
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
