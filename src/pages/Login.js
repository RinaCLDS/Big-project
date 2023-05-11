
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
const Login = () => {
  const new_cookies = new Cookies();
  const currentDate = new Date();
  const expiresDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
  const navigate = useNavigate();
  const token = new_cookies.get('token');
  if(token){
    axios.post('https://gurjar-xndl7.ondigitalocean.app/gurjar/get_user/', {
      'token': token
    })
    .then((response)=>{
      console.log('response', response)
      if(!response.data.valid){
        new_cookies.remove('token', {path: '/'});
      } else {
       navigate('/home');
      }
    })
    .catch((error)=>console.log(error))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {username, password} = e.target.elements;
    // console.log(username.value, password.value);
    axios.post('https://gurjar-xndl7.ondigitalocean.app/gurjar/login/', {
        'gurjar_id': username.value,
        'password': password.value
    })
    .then((response)=>{
      console.log('response', response)
      
      const token = response.data.token;
      new_cookies.set('token', token, {path: '/', expires: expiresDate});
      navigate('/home');
    })
    .catch((error)=>alert(error))
  }

  return (
  <section className='max-w-xs ' id='contact'>
  <div className='container mx-auto'>
    <div className='flex flex-col lg:flex-row '> 
      <form onSubmit={handleSubmit} className='flex-1 place-self-center border rounded-lg flex flex-col gap-y-6 pb-24 p-6 mt-4 '>
        <input className='bg-transparent border-b py-3 outline-none 
        w-full placeholder:text-black focus:border-accent transition-all' type='text' name='username' placeholder='Username'/>
        <input className='bg-transparent border-b py-3 outline-none
         w-full placeholder:text-black focus:border-accent transition-all' type='text' name='password' placeholder='Password'/>
      
         <button className='btn btn-sm'>Login</button>
         <span className=' text-black'>
            New to Chatify? click here <Link to="/register">Create Account</Link>
          </span>
      </form>
    </div>
  </div>
  </section>
  );
};

export default Login;