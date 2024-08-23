import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addtraintype } from '../../redux-toolkit/Slices/Traintype';
import { TRAIN_TYPE_POST } from '../../redux-toolkit/ApiUrl';

const Classtrain = () => {

    let { isLoading, isError, traintype } = useSelector((state) => state.traintype);


    let trainnumber = useRef();
    let traintypename = useRef();
    let dispatch = useDispatch();


    const handleSubmittraintype = (e) => {
        e.preventDefault();
        let traintypedata = {
            trainnumber: trainnumber.current.value,
            traintypename: traintypename.current.value,
        }
        console.log("🚀 ~ handleSubmittraintype ~ traintypedata:", traintypedata)
        dispatch(addtraintype({
            payload: traintypedata,
            endpoint: TRAIN_TYPE_POST
        }))
        trainnumber.current.value = "";
        traintypename.current.value = "";
    }
    return (
        <>
            <div class="p-4 sm:ml-64 m-4">
                <div className=" mx-auto mt-10 p-5 border border-gray-200 rounded-lg shadow-lg bg-white">
                    <h2 className="text-2xl font-bold mb-2">Create Train Type</h2>
                    {isError && (
                        <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-300 rounded">
                            {isError} 
                        </div>
                    )}
                    <form onSubmit={handleSubmittraintype}>
                        <div className="mb-4">
                            <label htmlFor="stationName" className="block text-sm font-medium text-gray-700">
                                Train Number
                            </label>
                            <input
                                type="text"
                                ref={trainnumber}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Train Number"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Train Type Name
                            </label>
                            <input
                                type="text"
                                ref={traintypename}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Train Type Name"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Add Train Type
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Classtrain
