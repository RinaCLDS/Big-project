import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";
const Dashboard = () => {
    const navigate = useNavigate();
    const new_cookies = new Cookies();
    const token = new_cookies.get('token');
    const logout = ()=>{
    new_cookies.remove('token', {path: '/'});
    navigate('/');}
    const profile = ()=>navigate('/profile');
  return (
    <div>
      {/* Logout button */}
        <button style={{'color':'black'}} onClick={logout}>Logout</button>
        <button style={{'color':'black'}} onClick={profile}>Profile</button>
    </div>
  )
}

export default Dashboard
