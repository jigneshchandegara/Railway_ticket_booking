import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtrainschedule } from '../../redux-toolkit/Slices/TrainSchedule';
import { TRAIN_SCHEDULE_POST } from '../../redux-toolkit/ApiUrl';

const TrainScheduleForm = () => {

    const { traintype } = useSelector((state) => state.traintype);
    const { classdata } = useSelector((state) => state.classdata);
    const { station } = useSelector((state) => state.station);
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        trainId: '',
        classes: [{ classname: '' }],
        departureStationId: '',
        arrivalStationId: '',
        departureTime: '',
        arrivalTime: '',
        date: '',
        intermediateStations: [{ stationId: '', arrivalTime: '', departureTime: '' }],
        daysOfWeek: [],
        active: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClassChange = (index, e) => {
        const newClasses = [...formData.classes];
        newClasses[index].classname = e.target.value;
        setFormData({ ...formData, classes: newClasses });
    };

    const handleIntermediateChange = (index, e) => {
        const newStations = [...formData.intermediateStations];
        const { name, value } = e.target;
        newStations[index][name] = value;
        setFormData({ ...formData, intermediateStations: newStations });
    };

    const addClass = () => {
        setFormData({
            ...formData,
            classes: [...formData.classes, { classname: '' }]
        });
    };

    const removeClass = (index) => {
        const newClasses = formData.classes.filter((_, idx) => idx !== index);
        setFormData({ ...formData, classes: newClasses });
    };

    const addIntermediateStation = () => {
        setFormData({
            ...formData,
            intermediateStations: [...formData.intermediateStations, { stationId: '', arrivalTime: '', departureTime: '' }]
        });
    };

    const removeIntermediateStation = (index) => {
        const newStations = formData.intermediateStations.filter((_, idx) => idx !== index);
        setFormData({ ...formData, intermediateStations: newStations });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addtrainschedule({
            payload: formData,
            endpoint: TRAIN_SCHEDULE_POST,
        }))
        console.log(formData, "formdata");
    };

    return (
        <>
            <div class="p-4 sm:ml-64 m-4">
                <div className=" mx-auto mt-10 p-5 border border-gray-200 rounded-lg shadow-lg bg-white">
                    <form onSubmit={handleSubmit} className=" mx-auto p-5 bg-white ">
                        <h2 className="text-xl font-bold mb-4">Train Schedule Form</h2>

                        <div className="mb-4">
                            <label className="block mb-1">Train ID</label>
                            <select
                                name="trainId"
                                value={formData.trainId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            >
                                <option value="">Select Train</option>
                                {traintype.length > 0 ? (
                                    traintype.map((value) => (
                                        <option key={value._id} value={value?._id}>
                                            {value?.trainnumber} ,{value?.traintypename}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No Train Available</option>
                                )}

                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Classes</label>
                            {formData.classes.map((cls, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <select
                                        name="classname"
                                        value={cls.classname}
                                        onChange={(e) => handleClassChange(index, e)}
                                        className="flex-grow border border-gray-300 p-2 rounded mr-2"
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {classdata.length > 0 ? (
                                            classdata.map((value) => (
                                                <option key={value._id} value={value?._id}>
                                                    {value?.classname}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No Class Available</option>
                                        )}
                                    </select>
                                    <button type="button" onClick={() => removeClass(index)} className="ml-2 p-2 bg-red-700 text-white">Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={addClass} className="mt-2 p-2 bg-blue-600 text-white">Add Class</button>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Departure Station ID</label>
                            <select
                                name="departureStationId"
                                value={formData.departureStationId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            >
                                <option value="">Select Departure Station</option>
                                {station.length > 0 ? (
                                    station.map((value) => (
                                        <option key={value._id} value={value._id}>
                                            {value?.stationname} :- {value?.location}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No Station Available</option>
                                )}

                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Arrival Station ID</label>
                            <select
                                name="arrivalStationId"
                                value={formData.arrivalStationId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            >
                                <option value="">Select Arrival Station</option>
                                {station.length > 0 ? (
                                    station.map((value) => (
                                        <option key={value._id} value={value._id}>
                                            {value?.stationname} :- {value?.location}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No Station Available</option>
                                )}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Departure Time</label>
                            <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1" >Arrival Time</label>
                            <input type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Date</label>
                            <input type="date" name="date" alue={formData.date} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Intermediate Stations</label>
                            {formData.intermediateStations.map((stationdb, index) => (
                                <div key={index} className="mb-2 flex items-center flex-wrap">
                                    <select
                                        name="stationId"
                                        value={station.stationId}
                                        onChange={(e) => handleIntermediateChange(index, e)}
                                        className="border border-gray-300 p-2 rounded mr-2"
                                        required
                                    >
                                        <option value="">Select Station</option>
                                        {station.length > 0 ? (
                                            station.map((value) => (
                                                <option key={value._id} value={value._id}>
                                                    {value?.stationname} :- {value?.location}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No Station Available</option>
                                        )}
                                    </select>
                                    <input
                                        type="time"
                                        name="arrivalTime"
                                        value={stationdb.arrivalTime}
                                        onChange={(e) => handleIntermediateChange(index, e)}
                                        className="border border-gray-300 p-2 rounded my-1 mr-2"
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="departureTime"
                                        value={stationdb.departureTime}
                                        onChange={(e) => handleIntermediateChange(index, e)}
                                        className="border border-gray-300 p-2 rounded my-1 mr-2"
                                        required
                                    />
                                    <button type="button" onClick={() => removeIntermediateStation(index)} className="ml-2 p-2 bg-red-700 text-white">Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={addIntermediateStation} className="mt-2 p-2 bg-blue-600 text-white">Add Intermediate Station</button>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Days of Week</label>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                <label key={day} className="inline-flex items-center mr-4">
                                    <input
                                        type="checkbox"
                                        value={day}
                                        checked={formData.daysOfWeek.includes(day)}
                                        onChange={(e) => {
                                            // console.log(e.target.checked);
                                            const newDaysOfWeek = e.target.checked
                                                ? [...formData.daysOfWeek, day]
                                                : formData.daysOfWeek.filter(d => d !== day)
                                            // console.log(formData.daysOfWeek)
                                            setFormData({ ...formData, daysOfWeek: newDaysOfWeek });
                                        }}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">{day}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                    className="form-checkbox"
                                />
                                <span className="ml-2">Active</span>
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
                    </form>
                </div>
            </div>


        </>
    );
};

export default TrainScheduleForm;


