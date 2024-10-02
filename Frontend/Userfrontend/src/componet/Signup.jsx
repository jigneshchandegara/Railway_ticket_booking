import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adduser } from '../redux_toolkit/Slices/SignSlices';
import { USER_POST } from '../redux_toolkit/Api_url';

const Signup = () => {
    // const fileInputRef = useRef(null);
    // const handleFileClick = (e) => {
    //     e.preventdefault()
    //     fileInputRef.current.click();
    // };

    const username = useRef();
    const email = useRef();
    const phone = useRef();
    const age = useRef();
    const gender = useRef();
    const proof = useRef();
    const profile = useRef();
    const password = useRef();


    const dispatch = useDispatch()

    const handlesubmituserdata = (e) => {
        e.preventDefault();

        const formdata = new FormData();

        formdata.append("username", username.current.value);
        formdata.append("email", email.current.value);
        formdata.append("phone", phone.current.value);
        formdata.append("age", age.current.value);
        formdata.append("gender", gender.current.value);
        formdata.append("proof", proof.current.value);
        formdata.append("profile", profile.current.files[0]);
        formdata.append("password", password.current.value);
        console.log(formdata);
        dispatch(adduser({
            payload: formdata,
            endpoint: USER_POST
        }))
    }

    return (
        <>
            <div className="container flex mx-auto items-center justify-center h-full mt-10">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign up</h2>
                    <form className="flex flex-wrap" onSubmit={handlesubmituserdata}>
                        <input
                            type="text"
                            ref={username}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] md:mr-[2%] "
                            placeholder="Full Name"
                        />
                        <input
                            type="email"
                            ref={email}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] md:ml-[2%]"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            ref={phone}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] md:mr-[2%]"
                            placeholder="Phone Number"
                        />
                        <input
                            type="text"
                            ref={age}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] md:ml-[2%]"
                            placeholder="Age"
                        />
                        <input
                            type="text"
                            ref={gender}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] md:mr-[2%]"
                            placeholder="Gender"
                        />
                        <input
                            type="text"
                            ref={proof}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] md:ml-[2%]"
                            placeholder="Proof Id"
                        />
                        <input
                            type="file"
                            ref={profile}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full "
                            placeholder="Proof Id"
                        />
                        {/* Hidden file input
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                        />
                        Custom button to trigger file input
                        <button
                            type="button"
                            onClick={handleFileClick}
                            ref={profile}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full  "
                        >
                            Profile Image
                        </button> */}

                        <input
                            type="password"
                            ref={password}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
