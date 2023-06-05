import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Cookies from "universal-cookie";
import axios from "axios";
import Gurjar from "./pages/Gurjar";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
function App() {
  // const new_cookies = new Cookies();
  // const navigate = useNavigate();
  // const token = new_cookies.get('token');
  // if(token){
  //   axios.post('https://gurjar-xndl7.ondigitalocean.app/gurjar/get_user/', {
  //     'token': token
  //   })
  //   .then((response)=>{
  //     console.log('response', response)
  //     if(!response.data.valid){
  //       new_cookies.remove('token', {path: '/'});
  //     } else {
  //      navigate('/home');
  //     }
  //   })
  //   .catch((error)=>console.log(error))
  // }
  return (
    <Router>
      <Routes className="main">
        <Route path="/" element={<Gurjar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />

        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
