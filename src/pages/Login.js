import {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const bodyData = {
      'gurjar_id': username,
      'password': password
    }
    try {
      const response = await axios.post('https://gurjar-xndl7.ondigitalocean.app/gurjar/login', bodyData);
      console.log(response)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
  <section className='max-w-xs ' id='contact'>
  <div className='container mx-auto'>
    <div className='flex flex-col lg:flex-row '> 
      <form className='flex-1 place-self-center border rounded-lg flex flex-col gap-y-6 pb-24 p-6 mt-4 '>
        <input className='bg-transparent border-b py-3 outline-none 
        w-full placeholder:text-black focus:border-accent transition-all' type='text' placeholder='Username'/>
        <input className='bg-transparent border-b py-3 outline-none
         w-full placeholder:text-black focus:border-accent transition-all' type='text' placeholder='Password'/>
      
         <button onClick={handleSubmit} className='btn btn-sm'>Login</button>
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