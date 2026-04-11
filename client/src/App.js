import {BrowserRouter, Routes, Route} from "react-router-dom";
import favicon from "./Towson_Marketplace_Favicon.png";
import Login from "./ReactRoutes/Login";
import Homepage from "./ReactRoutes/Homepage";
import HeaderBar from "./Components/HeaderBar";
import Profile from "./ReactRoutes/Profile";
import Register from "./ReactRoutes/Register";
import CreateListing from "./ReactRoutes/CreateListing";
import ListingDetails from "./ReactRoutes/ListingDetails";
import AboutUs from "./ReactRoutes/AboutUs";


function App() {

  return (
    <div className="App" >
      <link rel = "shortcut icon" href = {favicon} ></link>
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
                element = {<Login />}
              />

              <Route 
                path = "/profile"
                element = {<Profile />}
              />

              <Route 
                path = "/auth/register"
                element = {<Register />}
              />

              <Route 
                path = "/create"
                element = {<CreateListing />}
              /> 

              <Route 
                path = "/ListingDetails/:id"
                element = {<ListingDetails />}
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
