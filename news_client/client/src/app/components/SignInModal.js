import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignInModal({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });

            if (response.data.role === 'admin') {


            } else if (response.data.role === 'user') {

            } else {
                toast.error('Please Verfy Before Login.', { autoClose: 3000 });

            }
            const token = response.data.token;
            const role = response.data.role;
            localStorage.setItem('role', role);
            localStorage.setItem('token', token);
            window.location.reload();
            toast.success('successfully!', { autoClose: 3000 });

            onClose();
        } catch (error) {
            toast.error('An error occurred. Please try again later.', { autoClose: 3000 });

        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <CloseIcon className="text-black" />
                </button>
                <h2 className="text-2xl font-semibold">Sign In</h2>
                <form onSubmit={handleSignIn}>
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
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignInModal;