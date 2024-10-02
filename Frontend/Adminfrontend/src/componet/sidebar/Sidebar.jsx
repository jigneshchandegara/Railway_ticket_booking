import React, { useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { FaArtstation } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isStationOpen, setStationOpen] = useState(false);
    const [isTrainOpen, setTrainOpen] = useState(false);
    const [isbookingOpen, setbookingOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const togglemenusub = () => {
        setIsOpen(false);
    };
    const toggleStation = () => {
        setStationOpen(!isStationOpen);
        setTrainOpen(false);
        setbookingOpen(false);
    };

    const toggleTrain = () => {
        setTrainOpen(!isTrainOpen);
        setStationOpen(false);
        setbookingOpen(false);
    };

    const toggleBooking = () => {
        setbookingOpen(!isbookingOpen);
        setTrainOpen(false);
        setStationOpen(false);
    };

    const Signout = () => {
        Cookies.remove("accessToken");
        window.location.href = "/";
    };

    return (
        <>
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="px-3 py-3 lg:px-5 lg:pl-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start rtl:justify-end">
                            <button type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span class="sr-only">Open sidebar</span>
                                <CiMenuBurger />
                            </button>
                            <a href="#" class="flex ms-2 md:me-24">
                                {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" /> */}
                                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
                            </a>
                        </div>
                        <div class="flex items-center">
                            <div className="relative">
                                <button onClick={toggleMenu} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    {/* menu */}
                                    <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"></img>
                                </button>
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                        <ul className="py-1">
                                            <li>
                                                <a href="#link1" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                                    Link 1
                                                </a>
                                            </li>
                                            <li>
                                                <span className="block px-4 py-2 text-gray-800 hover:text-white hover:bg-red-700 transition ease-in-out duration-150" onClick={Signout}>
                                                    Sign out
                                                </span>
                                            </li>
                                            <li>
                                                {isOpen && (
                                                    <a href="#link3" onClick={togglemenusub} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                                        Link 3
                                                    </a>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <Link to={"/dashboard"} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"><IoHome />
                                <span class="ms-3">Dashboard</span></Link>
                        </li>
                        <li>
                            <button onClick={toggleStation} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaArtstation />
                                <span className="mx-3">Station Management</span>
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isStationOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isStationOpen && (
                                <ul className="ml-6 mt-2 space-y-1">
                                    <li>
                                        <Link to={"/addstation"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">Add Station</span>
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to={"/viewstation"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">View Stations</span>
                                        </Link>

                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={toggleTrain} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaTrainSubway />
                                <span className="mx-3">Train Management</span>
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isTrainOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isTrainOpen && (
                                <ul className="ml-6 mt-2 space-y-1">
                                    <li>
                                        <Link to={"/traincreate"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">Add Train Create</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/viewtraincreate"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">View Trains Create</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/addtrainSchedule"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">Add Train Schedule</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/viewtrainSchedule"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">View Trains Schedule</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/Scheduletrain"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">Schedule Train</span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={toggleBooking} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaTrainSubway />
                                <span className="mx-2">Booking Management</span>
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isbookingOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isbookingOpen && (
                                <ul className="ml-6 mt-2 space-y-1">
                                    <li>
                                        <Link to={"/booking"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">Booking</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/bookinglist"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <span className="ms-3">View Booking</span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Dashboard
