
import './App.css';
import MapComponent from './functions/MapComponent.js';
import MergingData from './functions/MergingData';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Legend from './pages/Legend';
function App() {
  return (
    <div className='main'>
    <Dashboard />
    <div className='h-[700px]'></div>
  </div>
  );
}

export default App;



