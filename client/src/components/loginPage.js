import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [credentials, setCredentials] = useState({ name: '', password: '', token: '' });
    const [loginStage, setLoginStage] = useState(1); // 1 for initial login, 2 for 2FA input
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loginStage === 1) {
            // Initial login attempt, verify username and password
            try {
                const response = await fetch('http://localhost:5050/login/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: credentials.name,
                        password: credentials.password,
                    }),
                });

                if (response.ok) {
                    // Move to 2FA stage
                    setLoginStage(2);
                } else {
                    // Handle error
                    const errorData = await response.json();
                    toast.error(errorData.message || 'Login failed.');
                }
            } catch (error) {
                toast.error('Network error or server is unreachable.');
            }
        } else if (loginStage === 2) {
            // Submit 2FA token for verification
            try {
              const response = await fetch('http://localhost:5050/login/2fa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Needed to include cookies in the request
                body: JSON.stringify({
                    name: credentials.name, // Include name for identifying user session
                    token: credentials.token,
                }),
            });

                if (response.ok) {
                    const userData = await response.json();
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userId', userData.id);
                    sessionStorage.setItem('userName', userData.name);


                    navigate('/admin');
                    
                    
                    window.location.reload();
                    toast.success('Login successful.')
                    
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || '2FA verification failed.');
                }
            } catch (error) {
                toast.error('Network error or server is unreachable.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-start py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {loginStage === 1 ? "Sign in to your account" : "Enter your 2FA token"}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {loginStage === 1 && (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={credentials.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={credentials.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {loginStage === 2 && (
                            <div>
                                <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                                    2FA Token
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="token"
                                        name="token"
                                        type="text"
                                        autoComplete="off"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={credentials.token}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loginStage === 1 ? "Sign in" : "Verify 2FA"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
