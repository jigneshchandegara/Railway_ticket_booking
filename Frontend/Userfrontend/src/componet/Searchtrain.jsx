import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { getTrainSchedules } from '../redux_toolkit/Slices/Serachtrain';

const Searchtrain = ({searchinput}) => {


    const departureStationId = useRef();
    const arrivalStationId = useRef();
    const date = useRef();
    const dispatch = useDispatch();


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //         dispatch(
    //             getTrainSchedules({
    //                 departureStationId: departureStationId.current.value,
    //                 arrivalStationId: arrivalStationId.current.value,
    //                 date: date.current.value,
    //             })
    //         )
    //     navigate('/trainsearch');
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        let searchdata = {
            departureStationId: departureStationId.current.value,
            arrivalStationId: arrivalStationId.current.value,
            date: date.current.value
        }
        searchinput(searchdata)
    }



    return (
        <>
            <div class=" container mx-auto flex flex-col items-center justify-center h-full dark mt-10">
                <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white">Search Train</h2>
                    <form class="flex flex-wrap" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            ref={departureStationId}
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                            placeholder="From"
                        />
                        <input
                            type="text"
                            ref={arrivalStationId}
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                            placeholder="To"
                        />
                        <input
                            type="date"
                            ref={date}
                            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                        />
                        <button
                            type="submit"
                            class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Searchtrain

