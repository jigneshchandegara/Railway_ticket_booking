// import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import AddStation from "./componet/page/AddStation";
import ViewStation from "./componet/page/ViewStation";
import Dashboard from "./componet/page/Dashboard";
import Sidebar from "./componet/sidebar/Sidebar";
import Addtrainschedule from "./componet/page/Addtrainschedule";
import Viewtrain from "./componet/page/Viewtrainschedule";
import Traincreate from "./componet/page/Traincreate";
import ViewTraincreate from "./componet/page/ViewTraincreate";
import Scheduletrain from "./componet/page/Scheduletrain";
import Booking from "./componet/page/Booking";
import Signin from "./componet/page/Signin";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { CLASS_GET, Station_GET, TRAIN_SCHEDULE_GET, TRAIN_TYPE_GET } from "./redux-toolkit/ApiUrl";
import { getStation } from "./redux-toolkit/Slices/Station";
import { gettraintype } from "./redux-toolkit/Slices/Traintype";
import { getclass } from "./redux-toolkit/Slices/ClassData";
import { gettrainschedule } from "./redux-toolkit/Slices/TrainSchedule";

function App() {

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStation({ endpoint: Station_GET }))
    dispatch(gettraintype({ endpoint: TRAIN_TYPE_GET }))
    dispatch(getclass({ endpoint: CLASS_GET }))
    dispatch(gettrainschedule({ endpoint: TRAIN_SCHEDULE_GET }))
  }, [dispatch])

  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setRole(token);
    }
  }, []);

  if (role === null) {
    return (
      <Routes>
        <Route path="/" element={<Signin />} />
      </Routes>
    );
  }
  return (
    <>

      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstation" element={<AddStation />} />
        <Route path="/viewstation" element={<ViewStation />} />
        <Route path="/traincreate" element={<Traincreate />} />
        <Route path="/addtrainSchedule" element={<Addtrainschedule />} />
        <Route path="/viewtraincreate" element={<ViewTraincreate />} />
        <Route path="/viewtrainSchedule" element={<Viewtrain />} />
        <Route path="/Scheduletrain" element={<Scheduletrain />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  )
}

export default App