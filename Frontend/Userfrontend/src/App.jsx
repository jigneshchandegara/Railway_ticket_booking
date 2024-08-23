// import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Searchtrain from './componet/Searchtrain';
import Signin from './componet/Signin';
import Signup from './componet/Signup';
import Navbar from './componet/Navbar';
import TrainSearchResult from './componet/Trainserach';
import BookingForm from './componet/Booking';
import { useEffect, useState } from 'react';

function App() {

  const [searchInput, setsearchinput] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate("/trainsearch", { state: { searchdata: searchInput } })
    }
  },[searchInput])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Searchtrain searchinput={setsearchinput} />} />
        <Route path="/Singinuser" element={<Signin />} />
        <Route path="/Singupuser" element={<Signup />} />
        <Route path="/trainsearch" element={<TrainSearchResult />} />
        <Route path="/bookingnow" element={<BookingForm />} />
      </Routes>
    </>
  )
}

export default App
