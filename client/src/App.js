import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./ReactRoutes/Login";
import Homepage from "./ReactRoutes/Homepage";
import HeaderBar from "./Components/HeaderBar";
import Profile from "./ReactRoutes/Profile";
import Register from "./ReactRoutes/Register";
import CreateListing from "./ReactRoutes/CreateListing";
import ListingDetails from "./ReactRoutes/ListingDetails";
import AboutUs from "./ReactRoutes/AboutUs";
import { useAuthContext } from "./CustomHooks/useAuthContext";

function App() {

  const {user} = useAuthContext();

  return (
    <div className="App" >
        <BrowserRouter>
          <HeaderBar />
          <div className="reactRoutes">
            <Routes>

              <Route 
                exact path = "/" 
                element = {<Homepage />}
              />

              <Route 
                path = "/auth/login"
                element = {!user ? <Login /> : <Navigate to = "/" />}
              />

              <Route 
                path = "/profile"
                element = {<Profile />}
              />

              <Route 
                path = "/auth/register"
                element = {!user ? <Register /> : <Navigate to = "/" />}
              />

              <Route 
                path = "/create"
                element = {<CreateListing />}
              /> 

              <Route 
                path = "/ListingDetails/:id"
                element = {user ? <ListingDetails /> : <Navigate to = "/auth/login"/> }
              /> 
              
              <Route 
                path = "/aboutUs"
                element = {<AboutUs />}
              /> 

            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
