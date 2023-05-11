
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div className='backg'>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    {/* <Register/> */}
    <div className='h-[700px]'></div>
  </div>
  );
}

export default App;