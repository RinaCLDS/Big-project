import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import data from '../data/dataset.json';
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
    // .then((response)=>{
    //   if (!response.data.valid){
    //     console.log('otp is not valid')
    //     return false;
    //   } else {
    //     console.log('otp is valid')
    //     return true;
    //   }
    // })
    // .catch((error)=>{
    //   console.log(error)
    //   return false
    // })
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
  console.log(city)
  axios.get('https://restcountries.com/v3.1/all')
  .then((response)=>{console.log(response.data)})
  return (
    <section className='flex lg:justify-center sm:justify-center md:justify-center xl:justify-center' id='Register'>
    <form onSubmit={registerForm} class="w-full max-w-sm mt-20">
    <div class="flex flex-wrap -mx-20 mb-6">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Full Name
        </label>
        <input name='name' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name"/>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Gender
        </label>
        <div class="relative">
          <select name='gender' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
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
        <input name='dateBirth' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="" placeholder="Date"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-20 mb-6">
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
    <div class="flex flex-wrap -mx-20 mb-6">
    <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
          <select name='city' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
          
          >
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
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
    <div class="flex flex-wrap -mx-20 mb-6">
      
    <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Mobile 
        </label>
        <div class="relative">
          <select id="mobileCode" required  name='mobileCode' class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option>+63</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Number
        </label>
        <input required id='mobileNumber' name='mobileNumber' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="9666972501"/>
        <a href="#!" onClick={send_otp} className="text-gray-700 border-2 border-black rounded ml-3 p-3 hover:bg-sky-700 hover:text-white">Send</a>
      </div>
      <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          OTP
        </label>
        <input required id='otp' name='otp' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="6 digit number"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-20 mb-6">
      <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Email  Address
        </label>
        <input required name='email' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="GurjarIndia@gmail.com"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-20 mb-6">
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
      <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
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
    <button className='btn btn-sm place-items-end'>Register</button>
    <Link className='text-gray-700 border-2 border-black rounded ml-3 p-3 hover:bg-sky-700 hover:text-white' to='/'>Login</Link>
  </form>
  </section>
  );
};

export default Register;