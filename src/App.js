/*
Title : AssetManagement WEB React
Author : Priyadharshini K
Created at : 26/01/2025
Updated at : 29/01/2025
Reviewed by : 
Reviewed at : 
*/

import "./App.css";
import Home from "./pages/Home/Home";
import "../node_modules/jquery/dist/jquery";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assets from "./pages/Assets/Assets";
import Request from "./pages/Requests/Request";
import { Login } from "./components";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/Register/Register";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ViewTickets from "./pages/Ticket/Ticket";
import CreateTicket from "./pages/Ticket/CreateTicket";

function App() {
  return (
    <div className="App bg-lightGrey" style={{ minHeight: "100vh" }}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Login Route - Not protected */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/" element={<Home />} />

            {/* Private Routes - All routes except Login are protected */}
            <Route element={<PrivateRoute />}>
              <Route path="/Assets" element={<Assets />} />
              <Route path="/Requests" element={<Request />} />
              <Route path="/create" element={<CreateTicket />} />
              <Route path="/Tickets" element={<ViewTickets />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
