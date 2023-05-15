
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile'
function App() {
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
