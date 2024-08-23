import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';

const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'trainId', headerName: 'TRAIN ID', width: 130 },
    { field: 'classes', headerName: 'CLASSES', width: 130 },
    { field: 'departureStationId', headerName: 'DEPARTURE STATION', width: 200 },
    { field: 'arrivalStationId', headerName: 'ARRIVAL STATION', width: 160 },
    { field: 'departureTime', headerName: 'DEPARTURE TIME', width: 160 },
    { field: 'arrivalTime', headerName: 'ARRIVAL TIME', width: 160 },
    { field: 'date', headerName: 'DATE', width: 160 },
    { field: 'intermediateStations', headerName: 'INTERMEDIATE STATIONS', width: 300 },
    { field: 'daysOfWeek', headerName: 'DAY OF WEEK', width: 160 },
    { field: 'active', headerName: 'ACTIVE', width: 160 },
    { field: 'edit', headerName: 'edit', width: 160 },
    { field: 'delete', headerName: 'delete', width: 160 },
];

const Viewtrain = () => {
    const { isLoading, isError, trainSchedule } = useSelector((state) => state.trainSchedule);
    console.log("🚀 ~ Viewtrain ~ trainSchedule:", trainSchedule)
    // const { traintype } = useSelector((state) => state.traintype);
    // const { classdata } = useSelector((state) => state.classdata);
    // const { station } = useSelector((state) => state.station);

    const [rows, setRows] = useState([]);
    console.log("🚀 ~ Viewtrain ~ rows:", rows)
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [editingRow, setEditingRow] = useState(null);

    useEffect(() => {
        const trainscheduledata = trainSchedule.map((value, index) => ({
            id: index + 1,
            _id: value?._id,
            trainId: value?.trainId?.traintypename || "null",
            classes: value?.classes,
            departureStationId: value?.departureStationId?.stationname || "null",
            arrivalStationId: value?.arrivalStationId?.stationname || "null",
            departureTime: value?.departureTime || "null",
            arrivalTime: value?.arrivalTime || "null",
            date: value?.date || "null",
            intermediateStations: value?.intermediateStations || [],
            daysOfWeek: value?.daysOfWeek || [],
            active: value?.active || false,
        }));
        setRows(trainscheduledata);
    }, [trainSchedule]);

    const totalPages = Math.ceil(rows.length / pageSize);
    const currentRows = rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    console.log("🚀 ~ Viewtrain ~ currentRows:", currentRows)

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => Math.min(Math.max(prev + direction, 0), totalPages - 1));
    };

    const handlePageSizeChange = (e) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
        setCurrentPage(0); // Reset to the first page
    };

    const handleEditClick = (id) => {
        setEditingRow(id);
    };

    const handleDeleteClick = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    return (
        <>
            <div className="p-4 sm:ml-64 m-4">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">Train Schedule List</h2>
                        <div className="overflow-x-auto overflow-y-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead className="bg-gray-200">
                                    <tr>
                                        {columns.map((column) => (
                                            <th key={column.field} className="border px-4 py-2 text-left text-sm font-medium text-gray-600">
                                                {column.headerName}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {currentRows.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-100">
                                            {columns.map(({ field }) => (
                                                <td key={field} className="border px-4 py-2 text-sm text-gray-800">
                                                    {field === 'edit' ? (
                                                        <button
                                                            onClick={() => handleEditClick(row.id)}
                                                            className="text-blue-500"
                                                        >
                                                            <MdEdit />
                                                        </button>
                                                    ) : field === 'delete' ? (
                                                        <button
                                                            onClick={() => handleDeleteClick(row.id)}
                                                            className="text-red-500"
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    ) : field === 'classes' ? (
                                                        <div className="max-h-20 overflow-y-auto">
                                                            {row.classes.map((classdata, index) => (
                                                                console.log(classdata),
                                                                <div key={index}>
                                                                    <span>{index + 1} :- {classdata.classname.classname}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : field === 'intermediateStations' ? (
                                                        <div className="max-h-20 overflow-y-auto">
                                                            {row.intermediateStations.map((station, index) => (
                                                                <div key={index}>
                                                                    <p>{index + 1} :-
                                                                        {station.stationId.stationname} <br />
                                                                        <span> (Arr.Time: {station.arrivalTime}, Dep.Time: {station.departureTime})</span>
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : field === 'daysOfWeek' ? (
                                                        row.daysOfWeek.join(', ')
                                                    ) : field === 'active' ? (
                                                        <input
                                                            type="checkbox"
                                                            checked={row.active}
                                                            className="form-checkbox my-2 mx-4" />
                                                    ) : (
                                                        row[field]
                                                    )
                                                    }
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <select
                                value={pageSize}
                                onChange={handlePageSizeChange}
                                className="border rounded px-2 py-1"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                            <div>
                                <button
                                    onClick={() => handlePageChange(-1)}
                                    disabled={currentPage === 0}
                                    className={`px-4 py-2 border rounded ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                >
                                    Previous
                                </button>
                                <span className="mx-2">{`${currentPage + 1} of ${totalPages}`}</span>
                                <button
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === totalPages - 1}
                                    className={`px-4 py-2 border rounded ${currentPage === totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Viewtrain;
