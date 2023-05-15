
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
       navigate('/dashboard');
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
      if (response.data.valid){
        const token = response.data.token;
        new_cookies.set('token', token, {path: '/', expires: expiresDate});
        navigate('/dashboard');
      } else {
        alert('Invalid Credentials');
      }
      
    })
    .catch((error)=>alert(error))
  }

  return (
    
  <section className='sm:p-25 sm:section' id='contact'>
  <div className='container mx-auto max-w-sm'>
    <div className='flex flex-col'> 
      <form onSubmit={handleSubmit} className='flex-1 place-self-center border border-4 rounded-lg flex flex-col gap-y-6 pb-24 p-6 mt-4 '>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-2 text-center text-2xl font-extrabold text-gray-900">Login your Gurjar Account</h2>
    </div> 
        <input className='bg-transparent  text-black border-b py-3 outline-none 
        w-full placeholder:text-black focus:border-accent transition-all' type='text' name='username' placeholder='Username'/>
        <input  className='bg-transparent  text-black border-b py-3 outline-none
         w-full placeholder:text-black focus:border-accent transition-all' type='password' name='password' placeholder='Password'/>
         <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
         <span className=' text-black'>
            New to Gurjar? click here to <Link className="text-accent" to="/register">Sign up</Link>
          </span>
      </form>
    </div>
  </div>
  </section>
  );
};

export default Login;