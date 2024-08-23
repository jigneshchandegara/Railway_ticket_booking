import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deletetrainType, updatetrainType } from '../../redux-toolkit/Slices/Traintype';
import { TRAIN_TYPE_DELETE, TRAIN_TYPE_UPDATA } from '../../redux-toolkit/ApiUrl';

// Sample Data
const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'trainnumber', headerName: 'TRAIN NUMBER', width: 130 },
    { field: 'traintypename', headerName: 'TRAIN TYPE NAME', width: 130 },
    { field: 'edit', headerName: 'Edit', width: 200 },
    { field: 'delete', headerName: 'Delete', width: 160 },
];


const Viewtrain = () => {

    const { isLoading, isError, traintype } = useSelector((state) => state.traintype)
    // console.log(traintype, "traintype");

    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch()
    const [editingRow, setEditingRow] = useState(null);

    //Handle get data
    useEffect(() => {
        const traintypedata = traintype.map((value, index) => ({
            id: index + 1,
            _id: value?._id,
            trainnumber: value?.trainnumber || "null",
            traintypename: value?.traintypename || "null",
        }));
        setRows(traintypedata)
    }, [traintype])

    const totalPages = Math.ceil(rows.length / pageSize);  // Calculate total pages
    const currentRows = rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);    // Get current rows
    const handlePageChange = (direction) => {                                                        // Change the current page
        setCurrentPage((prev) => Math.min(Math.max(prev + direction, 0), totalPages - 1));
    };

    //Handle delete button click
    const handleDeleteClick = (id) => {
        dispatch(deletetrainType({
            endpoint: TRAIN_TYPE_DELETE,
            id: id
        }))
    }

    // Handle edit button click
    const handleEditClick = (id) => {
        console.log(id ,"id");
        setEditingRow(id)
    };
    const viewupdata = (e) => {
        setEditingRow({ ...editingRow, [e.target.name]: e.target.value })
    }

    const handleSavetraintype = () => {
        dispatch(updatetrainType({
            endpoint: TRAIN_TYPE_UPDATA,
            id: editingRow._id,
            payload: editingRow
        }))
    }




    return (
        <>
            <div className="p-4 sm:ml-64 m-4">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">Train Type List</h2>
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
                                        placeholder="TRAIN NUMBER"
                                        name="trainnumber" value={editingRow.trainnumber} onChange={viewupdata}
                                        className="border rounded px-2 py-1 mr-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="TRAIN TYPE NAME"
                                        name="traintypename" value={editingRow.traintypename} onChange={viewupdata}
                                        className="border rounded px-2 py-1 mr-2"
                                    />
                                    <button
                                        onClick={handleSavetraintype}
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
