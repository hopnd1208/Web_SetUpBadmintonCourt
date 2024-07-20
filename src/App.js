import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./component/Header";
import Court from "./component/Court";
import Headerv2 from "./managerpages/Headerv2";
import Sidebar from "./managerpages/Sidebar";
import CourtManagement from "./managerpages/CourtManagement";
import Footer from "./component/Footer";
import Shop from "./component/Shop";
import CourtDetail from "./component/CourtDetail";
import Payment from "./component/Payment";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCourt from "./managerpages/CreateCourt";
import Order from "./managerpages/ManagementOrder";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <>
              <Header />
              <Court />
              <Footer />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Header />
              <Shop />
              <Footer />
            </>
          }
        />
        <Route
          path="/court-detail/:id"
          element={
            <>
              <Header />
              <CourtDetail  />
              <Footer />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Payment />
              <Footer />
            </>
          }
        />
        <Route
          path="/manager/orders"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                <Headerv2 />
                <Order />
              </div>
            </div>
          }
        />
        <Route
          path="/manager/courts"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                <Headerv2 />
                <CourtManagement />
              </div>
            </div>
          }
        />
        <Route
          path="/manager/courts/new"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                <Headerv2 />
                <CreateCourt />
              </div>
            </div>
          }
        />
        
      </Routes>
    </Router>  
      
  );

}

export default App;
