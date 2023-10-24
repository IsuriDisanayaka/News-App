"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Index from './pages/Index.js';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';

function Page() {
  const [content, setContent] = useState(<div>Loading...</div>);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      const token = localStorage.getItem('token');

      if (role === 'admin' && token) {
        setContent(<Dashboard />);
      } else {
        setContent(<Index />);
      }
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {content}
    </>
  );
}

export default Page;
