import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const logout = ()=>{
        const cookies = new Cookies();
        cookies.remove('token', {path: '/'});
        navigate('/');
    }
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
