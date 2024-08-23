import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BookingForm = () => {
    const location = useLocation();
    const rowData = location.state || {};
    const [passengers, setPassengers] = useState([
        { passengername: '', passengerAge: '', passengerGender: '', passengerContact: '' }
    ]);
    const [selectedClass, setSelectedClass] = useState(rowData.classes );
    // console.log(selectedClass,"class");
    const [numberOfSeats, setNumberOfSeats] = useState('');
    const [status, setStatus] = useState('Waiting');
    const [date, setDate] = useState('');
    const handlePassengerChange = (index, event) => {
        const { name, value } = event.target;
        const updatedPassengers = [...passengers];
        updatedPassengers[index] = { ...updatedPassengers[index], [name]: value };
        setPassengers(updatedPassengers);
    };
    const handleClassChange = (e) => {
        console.log(selectedClass);
        setSelectedClass(e.target.value);
    };
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    const handleAddPassenger = () => {
        setPassengers([...passengers, { passengername: '', passengerAge: '', passengerGender: '', passengerContact: '' }]);
    };
    const handleRemovePassenger = (index) => {
        const updatedPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(updatedPassengers);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let bookingobject = {
            trainScheduleId: rowData.trainId?.traintypename,
            passenger: passengers,
            Numberofseat: numberOfSeats,
            selectClass: selectedClass,
            status: status,
            bookingDate: date
        }
        console.log(bookingobject ,"final data");
    };

    return (
        <>

            <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
                <h2 className="text-2xl font-semibold mb-4">Book Your Train</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="trainScheduleId" className="block text-sm font-medium text-gray-700">Train Name</label>
                        <input
                            type="text"
                            value={rowData.trainId.traintypename || ""}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    {passengers.map((passenger, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Passenger {index + 1}</h3>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="passengername"
                                        value={passenger.passengername}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Age</label>
                                    <input
                                        type="number"
                                        name="passengerAge"
                                        value={passenger.passengerAge}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="passengerGender"
                                    value={passenger.passengerGender}
                                    onChange={(e) => handlePassengerChange(index, e)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Contact</label>
                                <input
                                    type="text"
                                    name="passengerContact"
                                    value={passenger.passengerContact}
                                    onChange={(e) => handlePassengerChange(index, e)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemovePassenger(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove Passenger
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddPassenger}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add Another Passenger
                    </button>
                    <div className="mb-4 mt-6">
                        <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                        <input
                            type="number"
                            value={numberOfSeats}
                            onChange={(e) => setNumberOfSeats(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Class</label>
                        <select name="classname" value={selectedClass} onChange={handleClassChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" required >
                            {
                                rowData.classes.map((value, index) => {
                                    console.log(value,"value data");
                                     return <option value={value.classname.classname} key={index}>{value.classname.classname}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={handleStatusChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="Waiting">Waiting</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <input type="date" value={date}
                            onChange={handleDateChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    > Book Now
                    </button>
                </form>


            </div >
        </>

    );
};

export default BookingForm;
