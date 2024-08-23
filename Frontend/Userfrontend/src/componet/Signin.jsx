import React, { useRef, useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigete = useNavigate()

    const submitdata = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const objectuser = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };

            const res = await axios.post(`http://localhost:8080/Api/User/User_login`, objectuser);

            if (res.data && res.data.data.accessToken) {
                Cookies.set("accessToken", res.data.data.accessToken, { secure: true });
                // alert("login successfully")
                navigete('/');
            } else {
                setError("Login failed. No access token returned.");
            }
        } catch (error) {
            setError("Login failed and Please check your Email and password and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full mt-10 dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Sign In</h2>
                <form className="flex flex-col" onSubmit={submitdata}>
                    <input
                        placeholder="User Name"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        ref={username}
                        required
                    />
                    <input
                        placeholder="Email address"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="email"
                        ref={email}
                        required
                    />
                    <input
                        placeholder="Password"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        ref={password}
                        required
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signin;