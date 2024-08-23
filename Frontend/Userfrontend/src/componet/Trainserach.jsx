import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getTrainSchedules } from "../redux_toolkit/Slices/Serachtrain";

const TrainSearchResult = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialsearchdata = location.state?.searchdata || "";


  useEffect(() => {
    if (initialsearchdata) {
      dispatch(getTrainSchedules(initialsearchdata))
    }
  },[initialsearchdata]);



  const { Serachtrain, isloading, isError } = useSelector((state) => state.trains);
  console.log(Serachtrain, "final");

  const [showStations, setShowStations] = useState({});
  const toggleStations = (trainIndex) => {
    setShowStations((prevState) => ({
      ...prevState,
      [trainIndex]: !prevState[trainIndex], // Toggle visibility for the selected train
    }));
  };

  const bookingdata = (data) => {
    console.log(data, "booking data");
    navigate('/bookingnow', { state: data });
  }

  return (
    <>
      {Serachtrain.map((value, index) => (
        <div key={index} className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{value.trainId.traintypename}</h2>
              <p className="text-sm text-gray-600">{value.trainId.trainnumber}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-md font-medium text-gray-700">Departure</h3>
              <p className="text-sm text-gray-500">{value.departureTime}</p>
              <p className="text-sm text-gray-500">{value.departureStationId.stationname}</p>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-700">Arrival</h3>
              <p className="text-sm text-gray-500">{value.arrivalTime}</p>
              <p className="text-sm text-gray-500">{value.arrivalStationId.stationname}</p>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-700">Date</h3>
              <p className="text-sm text-gray-500">{value.date}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-700">Class & Fare</h3>
            {value.classes.map((cls, i) => (
              <div key={i} className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">{cls.classname.classname}</p>
                <p className="text-sm text-gray-500">{cls.classname.setnumber}</p>
              </div>
            ))}
          </div>
          <button
            className="text-md font-medium text-gray-700 "
            onClick={() => toggleStations(index)}
          >
            {showStations[index] ? "Hide Intermediate Stations List" : "Show Intermediate Stations List"}
          </button>

          {showStations[index] && (
            <table className="min-w-full mt-4 bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Station Name</th>
                  <th className="px-4 py-2 border-b text-left">Arrival Time</th>
                  <th className="px-4 py-2 border-b text-left">Departure Time</th>
                </tr>
              </thead>
              <tbody>
                {value.intermediateStations.map((station, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 border-b">{station.stationId.stationname}</td>
                    <td className="px-4 py-2 border-b">{station.arrivalTime}</td>
                    <td className="px-4 py-2 border-b">{station.departureTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={() => bookingdata(value)}>
            Book Now
          </button>
        </div>
      ))}
    </>
  );
};

export default TrainSearchResult;
