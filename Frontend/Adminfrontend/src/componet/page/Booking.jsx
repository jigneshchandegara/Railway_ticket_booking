import React, { useState } from 'react';

const BookingForm = () => {
    const [trainScheduleId, setTrainScheduleId] = useState('');
    const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '', contact: '' }]);
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const [selectedClass, setSelectedClass] = useState('');
    const [status, setStatus] = useState('Waiting');
    const [refundStatus, setRefundStatus] = useState('Pending');
    const [cancellationReason, setCancellationReason] = useState('');

    const handlePassengerChange = (index, event) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][event.target.name] = event.target.value;
        setPassengers(updatedPassengers);
    };

    const addPassenger = () => {
        setPassengers([...passengers, { name: '', age: '', gender: '', contact: '' }]);
    };

    const removePassenger = (index) => {
        const updatedPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(updatedPassengers);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit form data to your backend here
        console.log({
            trainScheduleId,
            passengers,
            numberOfSeats,
            selectedClass,
            status,
            refundStatus,
            cancellationReason,
        });
    };

    return (
        <>
            <div class="p-4 sm:ml-64 m-4">
                <div className="mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-center mb-4">Booking Form</h2>
                    <form onSubmit={handleSubmit}>
                        {/* <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="trainScheduleId">
                                Train Schedule ID
                            </label>
                            <input
                                type="text"
                                id="trainScheduleId"
                                value={trainScheduleId}
                                onChange={(e) => setTrainScheduleId(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div> */}
                        {passengers.map((passenger, index) => (
                            <div key={index} className="mb-4 border p-4 rounded-md">
                                <h3 className="font-medium mb-2">Passenger {index + 1}</h3>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={passenger.name}
                                    onChange={(e) => handlePassengerChange(index, e)}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                />
                                <label className="block text-sm font-medium mb-2">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={passenger.age}
                                    onChange={(e) => handlePassengerChange(index, e)}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                />
                                <label className="block text-sm font-medium mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={passenger.gender}
                                    onChange={(e) => handlePassengerChange(index, e)}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label className="block text-sm font-medium mb-2">Contact</label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={passenger.contact}
                                    onChange={(e) => handlePassengerChange(index, e)}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePassenger(index)}
                                    className="my-2 p-2 bg-red-700 text-white"
                                >
                                    Remove Passenger
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addPassenger} className="my-2 p-2 bg-blue-600 text-white">
                            Add Another Passenger
                        </button>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Number of Seats</label>
                            <input
                                type="number"
                                value={numberOfSeats}
                                onChange={(e) => setNumberOfSeats(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Select Class</label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Select Class</option>
                                <option value="Sleeper">Sleeper</option>
                                <option value="AC">AC</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                            Submit Booking
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingForm;

// import React, { useState } from 'react';

// const BookingForm = () => {
//   const [trainScheduleId, setTrainScheduleId] = useState('');
//   const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '', contact: '' }]);
//   const [numberOfSeats, setNumberOfSeats] = useState(1);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [passengersPerPage] = useState(3); // Set the number of passengers per page

//   const handlePassengerChange = (index, event) => {
//     const updatedPassengers = [...passengers];
//     updatedPassengers[index][event.target.name] = event.target.value;
//     setPassengers(updatedPassengers);
//   };

//   const addPassenger = () => {
//     setPassengers([...passengers, { name: '', age: '', gender: '', contact: '' }]);
//   };

//   const removePassenger = (index) => {
//     const updatedPassengers = passengers.filter((_, i) => i !== index);
//     setPassengers(updatedPassengers);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Submit form data to your backend here
//     console.log({
//       trainScheduleId,
//       passengers,
//       numberOfSeats,
//       selectedClass,
//     });
//   };

//   // Calculate current passengers
//   const indexOfLastPassenger = currentPage * passengersPerPage;
//   const indexOfFirstPassenger = indexOfLastPassenger - passengersPerPage;
//   const currentPassengers = passengers.slice(indexOfFirstPassenger, indexOfLastPassenger);

//   // Calculate total pages
//   const totalPages = Math.ceil(passengers.length / passengersPerPage);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <div class="p-4 sm:ml-64 m-4">
//         <div className="mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold text-center mb-4">Booking Form</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2" htmlFor="trainScheduleId">
//                 Train Schedule ID
//               </label>
//               <input
//                 type="text"
//                 id="trainScheduleId"
//                 value={trainScheduleId}
//                 onChange={(e) => setTrainScheduleId(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//             </div>

//             <table className="min-w-full divide-y divide-gray-200 mb-4">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Age</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Gender</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentPassengers.map((passenger, index) => (
//                   <tr key={index + indexOfFirstPassenger}>
//                     <td className="px-4 py-2">
//                       <input
//                         type="text"
//                         name="name"
//                         value={passenger.name}
//                         onChange={(e) => handlePassengerChange(index + indexOfFirstPassenger, e)}
//                         required
//                         className="border border-gray-300 rounded-md p-1 w-full"
//                       />
//                     </td>
//                     <td className="px-4 py-2">
//                       <input
//                         type="number"
//                         name="age"
//                         value={passenger.age}
//                         onChange={(e) => handlePassengerChange(index + indexOfFirstPassenger, e)}
//                         required
//                         className="border border-gray-300 rounded-md p-1 w-full"
//                       />
//                     </td>
//                     <td className="px-4 py-2">
//                       <select
//                         name="gender"
//                         value={passenger.gender}
//                         onChange={(e) => handlePassengerChange(index + indexOfFirstPassenger, e)}
//                         required
//                         className="border border-gray-300 rounded-md p-1 w-full"
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </td>
//                     <td className="px-4 py-2">
//                       <input
//                         type="text"
//                         name="contact"
//                         value={passenger.contact}
//                         onChange={(e) => handlePassengerChange(index + indexOfFirstPassenger, e)}
//                         required
//                         className="border border-gray-300 rounded-md p-1 w-full"
//                       />
//                     </td>
//                     <td className="px-4 py-2">
//                       <button
//                         type="button"
//                         onClick={() => removePassenger(index + indexOfFirstPassenger)}
//                         className="text-red-500"
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <button type="button" onClick={addPassenger} className="text-blue-500 mb-4">
//               Add Another Passenger
//             </button>

//             <div className="flex justify-center mb-4">
//               <nav aria-label="Page navigation">
//                 <ul className="inline-flex -space-x-px">
//                   {Array.from({ length: totalPages }, (_, index) => (
//                     <li key={index + 1}>
//                       <button
//                         onClick={() => paginate(index + 1)}
//                         className={`px-3 py-1 border border-gray-300 text-sm font-medium ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-700'
//                           }`}
//                       >
//                         {index + 1}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Number of Seats</label>
//               <input
//                 type="number"
//                 value={numberOfSeats}
//                 onChange={(e) => setNumberOfSeats(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Select Class</label>
//               <select
//                 value={selectedClass}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//                 required
//                 className="w-full border border-gray-300 rounded-md p-2"
//               >
//                 <option value="">Select Class</option>
//                 <option value="Sleeper">Sleeper</option>
//                 <option value="AC">AC</option>
//                 <option value="General">General</option>
//               </select>
//             </div>
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
//               Submit Booking
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookingForm;
