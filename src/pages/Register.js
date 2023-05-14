import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import data from '../data/dataset.json';
import gotras from '../data/gotras.json';

const Register = () => {
  const get = (element)=> document.querySelector(element);
  const navigate = useNavigate();
  const new_cookies = new Cookies();
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
  const check_otp = async (otp, mobile_number)=>{
    return await axios.post('https://gurjar-xndl7.ondigitalocean.app/gurjar/check_otp/', {
      'mobile_number': mobile_number,
      'otp': otp
    })
  }
  const registerForm = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const gender = e.target.gender.value;
    const dateBirth = e.target.dateBirth.value;
    const religion = e.target.religion.value;
    const gotra = e.target.gotra.value;
    const bloodgroup = e.target.bloodgroup.value;
    const nationality = e.target.nationality.value
    const state = e.target.state.value;
    const city = e.target.city.value;
    const village = e.target.village.value;
    const mobileCode = e.target.mobileCode.value;
    const mobileNumber = e.target.mobileNumber.value;
    const email = e.target.email.value;
    const education = e.target.education.value;
    const profession = e.target.profession.value;
    const response = await check_otp(get('#otp').value, mobileCode+mobileNumber)
    if (!response.data.valid){
      alert('OTP is not valid')
      return;
    }
    axios.post('https://gurjar-xndl7.ondigitalocean.app/gurjar/create_user/', {
      'nationality': nationality,
      'religion': religion,
      'gender':gender,
      'language': 'NA',
      'name': name,
      'state': state,
      'city': city,
      'village': village,
      'gotra': gotra,
      'blood_group': bloodgroup,
      'date_of_birth': dateBirth,
      'mobile_number': `${mobileCode}${mobileNumber}`,
      'email': email,
      'education': education,
      'profession': profession,

    })
    .then((response) => {
      console.log(response);
      alert(`username: ${response.data.user} password: ${response.data.password}`)
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
    })
  }
  const send_otp = ()=>{
    const mobile_number = get('#mobileCode').value+get('#mobileNumber').value;
    console.log(mobile_number.length)
    if(mobile_number.length <= 4){
      alert('Please enter valid mobile number')
      return;
    }
    axios.post('https://gurjar-xndl7.ondigitalocean.app/gurjar/gurjar_otp/', {
      'mobile_number': mobile_number
    })
    .then((response)=>{
      console.log(response)
      alert('OTP sent')
    })
    .then((error)=>{
      console.log(error)
    })
    console.log(mobile_number)
  }
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  useEffect (()=>{
    if(Object.keys(state).length ===0){
      setState(data[0])
      setCity(data[0].states[0])
    }
  }, [state])
  const stateChange = (e)=>{
    setState(data[e.target.selectedIndex])
    
  }
  const cityChange = (e)=>{
    setCity(state.states[e.target.selectedIndex])
  }
  const [gurjar, setGurjar] = useState(false)
  const gurjarChange = ()=>setGurjar(!gurjar)
  return (

    <div class="min-h-screen bg-gray-200 flex flex-col justify-center py-3 px-4 lg:px-8 space-x-[-6]">
    <div class="mt-8 sm:mx-auto lg:w-full lg:max-w-md">
    
      {
        !gurjar ? (
          <div className='container mx-auto max-w-sm'>
          <div className='flex flex-col'> 
            <form className='flex-1 place-self-center flex flex-col gap-y-6 pb-24 p-6 mt-4 '>
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-2 text-center text-2xl font-extrabold text-gray-900">Are you a gurjar?</h2>
          </div> 
              <button onClick={gurjarChange} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Yes</button>
              <Link to={'/'} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">No</Link>
            </form>
          </div>
        </div>
        ): (
          <div class="bg-white py-5 px-3 shadow rounded-lg sm:px-4">
    <form onSubmit={registerForm} class="mb-0 space-y-6 ">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">Create gurjar account</h2>
    </div>
    <div class="flex lg -mx-4 ">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
          Name
        </label>
        <input required  name='name' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Full Name"/>
      </div>
      <div class="w-full  px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
          Gender
        </label>
        <div class="relative">
          <select name='religion' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option>Male</option>
          <option>Female</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Date of Birth
        </label>
        <input name='dateBirth' class=" form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="date" placeholder="MM-DD-YYYY" />
      </div>
    </div>
    <div class="flex lg -mx-4">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Religion
        </label>
        <div class="relative">
          <select name='religion' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option>Hindu</option>
          <option>Muslim</option>
          <option>Sikh</option>
          <option>Christian</option>
          <option>Jain</option>
          <option>Buddhism</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Gotra
        </label>
        <div class="relative">
          <select name='gotra' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option value="">Gotra group</option>            
            {
              gotras.map((item, index)=>(
                <option key={index}>{item.name}</option>
              ))
            }
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Blood group
        </label>
        <div class="relative">
          <select name='bloodgroup' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option>Choose</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      
    </div>
    <div class="flex lg -mx-4">
    <div class="w-full md:w-1/4 sm:w-2/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Nationality
        </label>
        <div class="relative">
          <select name='nationality' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
          onChange={stateChange}
          >
          {
            data.map((item, index)=>(
              <option key={index}>{item.name}</option>
            ))
          }
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          State
        </label>
        <div class="relative">
          <select name='state' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
          onChange={cityChange}
          >
          {
            Object.keys(state).length ===0 ? 
              data[0].states.map((item, index)=>(
                <option key={index}>{item.name}</option>
              ))
             : state.states.map((item, index)=>(
              <option key={index}>{item.name}</option>
            ))
          }
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          City
        </label>
        <div class="relative">
          <select name='city' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          {
            Object.keys(state).length ===0 ?
            ''
           : city.cities.map((item, index)=>(
              <option key={index}>{item.name}</option>
           ))
          }
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-3 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Village
        </label>
        <div class="relative">
          <select name='village' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option>Choose</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex lg -mx-4">
    <div class="w-full lg:w-1/3 md:w-1/3 sm:w-1/3 px-3 mb-3 sm:mb-0 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Mobile 
        </label>
        <div class="relative">
          <select id="mobileCode" required  name='mobileCode' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option>+63</option>
            <option>+93</option>
            <option>+91</option>
            <option>+62</option>
            <option>+98</option>
            <option>+39</option>
            <option>+81</option>
            <option>+60</option>
            <option>+95</option>
            <option>+31</option>
            <option>+64</option>
            <option>+64</option>
            <option>+48</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/3 md:w-2/3 sm:w-2/3  px-3 mb-3 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Number
        </label>
        <div class="relative">
        <input required id='mobileNumber' name='mobileNumber' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="9666972501"/>
        <a  href="#!" onClick={send_otp} class="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">OTP</a>
        </div>
        </div> 
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          OTP
        </label>
        <input required id='otp' name='otp' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="6 digit number"/>
      </div>
        </div> 
    <div class="flex lg -mx-4">
      <div class="w-full md:w-2/4 sm:2/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Email  Address
        </label>
        <input required name='email' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="GurjarIndia@gmail.com"/>
      </div>
    </div>
    <div class="flex lg -mx-4">
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Education 
        </label>
        <div class="relative">
          <select name='education' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option>Choose</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="w-full  md:w-2/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Profession 
        </label>
        <div class="relative">
          <select name='profession' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option>Choose</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>
    <div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
          <p class="mt-2 text-center text-sm text-gray-600 max-w">
      Already registered?
      <Link to='/' class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</Link>
    </p>
        </div>
  </form>
  </div>
        )
      }
    

    
  </div>
  </div>
  );
};

export default Register;