import {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const authObject = {'Project-ID': "b0b6b6a0-4b0a-4b0e-9b0a-4b0a4b0a4b0a", 'User-Name': username, 'User-Secret': password};
    try {
      await axios.get('https://api.chatengine.io/chats', {headers: authObject});
      localStorage.setItem('username', username);
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