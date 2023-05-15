
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile'
import Cookies from 'universal-cookie';
import axios from 'axios';
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
       <Routes>
       <Route  path='/Dashboard' element={<Dashboard/>}/>
       <Route  path='/' element={<Login/>}/>
       <Route  path='/Register' element={<Register/>}/>
       <Route  path='/Profile' element={<Profile/>}/>
     </Routes>
    </Router>

  );
}

export default App;
