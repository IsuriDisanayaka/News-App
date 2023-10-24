
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpModal({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [reEnterpassword, setReEnterpassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !password || !reEnterpassword) {
            toast.warning("Please fill out all required fields.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER, 
            });

        }
        if (password !== reEnterpassword) {
            toast.warning('Password not match!', { autoClose: 3000 });

        }

        try {
            const response = await axios.post('http://localhost:8080/user/save', {
                email,
                password,
                fullName,
                reEnterpassword
            });

            console.log('User registration success:', response.data);

            toast.success('successfully!', { autoClose: 3000 });
            toast.info('Please Check your email and verify email', { autoClose: 4000, })


            onClose();
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('An error occurred. Please try again later.', { autoClose: 3000 });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <CloseIcon className="text-black" />
                </button>
                <h2 className="text-2xl font-semibold">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reEnterpassword" className="block text-sm font-medium text-gray-700">Re-enter Password</label>
                        <input
                            type="password"
                            id="reEnterpassword"
                            name="reEnterpassword"
                            value={reEnterpassword}
                            onChange={(e) => setReEnterpassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpModal;
