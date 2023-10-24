"use client";

import React, { useState } from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

function Navbar() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);


  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  }

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  }
  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  }

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  }
  return (
    <nav className="bg-white p-4 xl:block-500 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">The News</h1>
      </div>
      <div>
        <a href="#" className="mr-4 text-black font-bold">Home</a>
        <a href="#" className="mr-4 text-black font-bold" onClick={openSignInModal}>SignIn</a>
        <a href="#" className="text-black font-bold" onClick={openSignUpModal}>SignUp</a>
      </div>
      {isSignInModalOpen && <SignInModal onClose={closeSignInModal} />}
      {isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} />}

    </nav>
  );
}

export default Navbar;
