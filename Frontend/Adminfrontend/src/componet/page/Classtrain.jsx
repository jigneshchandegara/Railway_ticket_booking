import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CLASS_POST } from '../../redux-toolkit/ApiUrl';
import { addclass } from '../../redux-toolkit/Slices/ClassData';

const AddStation = () => {
    let classname = useRef();
    let setnumber = useRef();
    let dispatch = useDispatch();

    let { isLoading, isError, classdata } = useSelector((state) => state.classdata);

    const handleSubmitclass = (e) => {
        e.preventDefault();
        let classdataToAdd = {
            classname: classname.current.value,
            setnumber: setnumber.current.value,
        };
        console.log(classdataToAdd);
        dispatch(addclass({
            payload: classdataToAdd,
            endpoint: CLASS_POST
        }));

        classname.current.value = "";
        setnumber.current.value = "";
    };

    return (
        <div className="p-4 sm:ml-64 m-4">
            <div className="mx-auto mt-10 p-5 border border-gray-200 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-2">Add Class</h2>
                {isError && (
                    <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-300 rounded">
                        {isError} 
                    </div>
                )}
                <form onSubmit={handleSubmitclass}>
                    <div className="mb-4">
                        <label htmlFor="stationName" className="block text-sm font-medium text-gray-700">
                            Class Name
                        </label>
                        <input
                            type="text"
                            ref={classname}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Class name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Set Number
                        </label>
                        <input
                            type="text"
                            ref={setnumber}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Set Number"
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Add Class
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddStation;
