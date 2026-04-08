import {BrowserRouter, Routes, Route} from "react-router-dom";
import favicon from "./Towson_Marketplace_Favicon.png";
import Login from "./ReactRoutes/Login";
import Homepage from "./ReactRoutes/Homepage";
import HeaderBar from "./Components/HeaderBar";
import Profile from "./ReactRoutes/Profile";
import Register from "./ReactRoutes/Register";


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

            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
