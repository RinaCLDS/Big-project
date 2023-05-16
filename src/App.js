
import './App.css';
import MapComponent from './functions/MapComponent.js';
import MergingData from './functions/MergingData';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  console.log(<MergingData/>);
  return (
    <div className='main'>
    <MergingData />
    <div className='h-[700px]'></div>
  </div>
  );
}

export default App;
