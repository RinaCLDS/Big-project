import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Cookies from "universal-cookie";
import axios from "axios";
import {useEffect, useState} from 'react'
import TopNavigationBar from "./components/TopNavigationBar";
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
  const listRoute = ['/dashboard', '/profile']
  const dataStore = localStorage.getItem('data')
  const [new_data, setNewData] = useState({})
  useEffect(() => {
    if(dataStore){
      const data = JSON.parse(dataStore)
      setNewData(data)
    }
    
  }, [setNewData])

  return (
    <Router>
      {
        listRoute.includes(window.location.pathname) ? <TopNavigationBar user={new_data} /> : null
      }
      <Routes>
        <Route className="backg" path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route className="backg" path="/register" element={<Register />} />
        <Route className="backg" path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
