import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Station_POST } from '../../redux-toolkit/ApiUrl';
import { addStation } from '../../redux-toolkit/Slices/Station';

const AddStation = () => {

    let stationname = useRef();
    let location = useRef();
    let dispatch = useDispatch();

    let { isLoading, isError, station } = useSelector((state) => state.station)

    const handleSubmitstation = (e) => {
        e.preventDefault();
        let newstation = {
            stationname: stationname.current.value,
            location: location.current.value,

        }
        console.log(newstation);
        dispatch(addStation({
            payload: newstation,
            endpoint: Station_POST
        }));

        stationname.current.value = "";
        location.current.value = "";
    };
    return (
        <>

            <div class="p-4 sm:ml-64 m-4">
                <div className=" mx-auto mt-10 p-5 border border-gray-200 rounded-lg shadow-lg bg-white">
                    <h2 className="text-2xl font-bold mb-2">Add Station</h2>
                    {isError && (
                        <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-300 rounded">
                            {isError} {/* Assuming isError contains the error message */}
                        </div>
                    )}
                    <form onSubmit={handleSubmitstation}>
                        <div className="mb-4">
                            <label htmlFor="stationName" className="block text-sm font-medium text-gray-700">
                                Station Name
                            </label>
                            <input
                                type="text"
                                id="stationName"
                                ref={stationname}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter station name"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                ref={location}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter location"
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Add Station
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddStation
