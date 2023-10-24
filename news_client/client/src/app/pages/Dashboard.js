"use client";
import Head from "next/head";
import { useState } from "react";
import AllArticle from '../pages/AllArticle';
import CreateArticle from './CreateArticle';
import NavbarForDash from '../components/NavbarForDash';


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarForDash />
      <div
        className="h-screen bg-white py-8 flex flex-row"
      >

        <div className="w-1/4 border-r border-gray-300 overflow-y-auto">
          <nav>
            <button
              className={`block w-full text-left py-2 px-4 ${activeTab === "tab1" ? "bg-blue-500 text-black" : "text-gray-500"
                }`}
              onClick={() => setActiveTab("tab1")}
            >
              Dashboard
            </button>
            <button
              className={`block w-full text-left py-2 px-4 ${activeTab === "tab2" ? "bg-blue-500 text-black" : "text-gray-500"
                }`}
              onClick={() => setActiveTab("tab2")}
            >
              Article
            </button>
            <button
              className={`block w-full text-left py-2 px-4 ${activeTab === "tab3" ? "bg-blue-500 text-black" : "text-gray-500"
                }`}
              onClick={() => setActiveTab("tab3")}
            >
              New Article
            </button>
            <button
              className={`block w-full text-left py-2 px-4 ${activeTab === "logout" ? "bg-blue-500 text-black" : "text-gray-500"
                }`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>

        <div className="w-3/4 p-8 overflow-y-auto">
          {activeTab === "tab1" && <Tab1Content />}
          {activeTab === "tab2" && <Tab2Content />}
          {activeTab === "tab3" && <Tab3Content />}
        </div>
      </div>
    </div>
  );
}

const Tab1Content = () => (
  <div className="p-4">
    <div className="">
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="container mx-auto px-6">
        <h1 className="text-3xl mb-6 text-black">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4 text-black">Users</h2>
            <p className="text-black">60</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4 text-black">Article</h2>
            <p className="text-black">200</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Tab2Content = () => (
  <div className="p-4">
    <div className="">
      <AllArticle />
    </div>
  </div>
);

const Tab3Content = () => (
  <div className="p-4 bg-white">
    <div className="bg-white  ">
      <CreateArticle />
    </div>
  </div>
);