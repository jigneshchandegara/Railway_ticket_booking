import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { CLASS_DELETE, CLASS_UPDATA } from '../../redux-toolkit/ApiUrl';
import { deleteclass, updateclass } from '../../redux-toolkit/Slices/ClassData';

// Sample Data
const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'classname', headerName: 'Station', width: 130 },
    { field: 'setnumber', headerName: 'Location', width: 130 },
    { field: 'edit', headerName: 'Edit', width: 200 },
    { field: 'delete', headerName: 'Delete', width: 160 },
];

const initialRows = [
    { id: 1, location: 'Snow', station: 'Jon' },
    { id: 2, location: 'Lannister', station: 'Cersei' },
    { id: 3, location: 'Lannister', station: 'Jaime' },
    { id: 4, location: 'Stark', station: 'Arya' },
    { id: 5, location: 'Targaryen', station: 'Daenerys' },
    { id: 6, location: 'Melisandre', station: null },
    { id: 7, location: 'Clifford', station: 'Ferrara' },
    { id: 8, location: 'Frances', station: 'Rossini' },
    { id: 9, location: 'Roxie', station: 'Harvey' },
    { id: 10, location: 'Roxie', station: 'Harvey' },
    { id: 11, location: 'Roxie', station: 'Harvey' },
    { id: 12, location: 'Roxie', station: 'Harvey' },
    { id: 13, location: 'Roxie', station: 'Harvey' },
    { id: 14, location: 'Roxie', station: 'Harvey' },
    { id: 15, location: 'Roxie', station: 'Harvey' },
    { id: 16, location: 'Roxie', station: 'Harvey' },
    { id: 17, location: 'Roxie', station: 'Harvey' },
    { id: 18, location: 'Roxie', station: 'Harvey' },
    { id: 19, location: 'Roxie', station: 'Harvey' },
    { id: 20, location: 'Roxie', station: 'Harvey' },
];

const Viewtrain = () => {
    let { isLoading, isError, classdata } = useSelector((state) => state.classdata);
    // console.log(classdata, "getdataclass");

    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [editingRow, setEditingRow] = useState(null);
    const dispatch = useDispatch()
    // Handle get data
    useEffect(() => {
        const dataclass = classdata.map((value, index) => ({
            id: index + 1,
            _id: value?._id,
            classname: value?.classname || "null",
            setnumber: value?.setnumber || "null",
        }));
        setRows(dataclass);
    }, [classdata]);

    const totalPages = Math.ceil(rows.length / pageSize);  // Calculate total pages
    const currentRows = rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);    // Get current rows
    const handlePageChange = (direction) => {                                                        // Change the current page
        setCurrentPage((prev) => Math.min(Math.max(prev + direction, 0), totalPages - 1));
    };

    //Handle delete button click
    const handleDeleteClick = (id) => {
        console.log(id, "id");
        dispatch(deleteclass({
            endpoint: CLASS_DELETE,
            id: id,
        }));
    };

    // Handle edit button click
    const handleEditClick = (id) => {
        setEditingRow(id)
    };
    const viewupdata = (e) => {
        setEditingRow({ ...editingRow, [e.target.name]: e.target.value })
    }

    const handleSaveEditclass = () => {
        dispatch(updateclass({
            endpoint: CLASS_UPDATA,
            id: editingRow._id,
            payload: editingRow
        }))
    }

    return (
        <>
            <div className="p-4 sm:ml-64 m-4">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">Class List</h2>
                        <div className="overflow-x-auto">
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
                                                            onClick={() => handleEditClick(row)}
                                                            className="text-blue-500"
                                                        >
                                                            <MdEdit />
                                                        </button>
                                                    ) : field === 'delete' ? (
                                                        <button
                                                            onClick={() => handleDeleteClick(row._id)}
                                                            className="text-red-500"
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    ) : (
                                                        row[field]
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {editingRow && (
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">Edit Row</h2>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="class name"
                                        name="classname" value={editingRow.classname} onChange={viewupdata}
                                        className="border rounded px-2 py-1 mr-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="set number"
                                        name="setnumber" value={editingRow.setnumber} onChange={viewupdata}
                                        className="border rounded px-2 py-1 mr-2"
                                    />
                                    <button
                                        onClick={handleSaveEditclass}
                                        className="bg-blue-500 text-white rounded px-2 py-1"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingRow(null)}
                                        className="bg-gray-300 rounded px-2 py-1 ml-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setCurrentPage(0); // Reset to first page on page size change
                                }}
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
};

export default Viewtrain;
