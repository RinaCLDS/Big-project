import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
  return (

    <div class="min-h-screen bg-gray-200 flex flex-col justify-center py-3 px-4 lg:px-8 space-x-[-6]">
    <div class="mt-8 sm:mx-auto lg:w-full lg:max-w-md">

    
      
    <div className='container mx-auto max-w-sm'>
    <div className='flex flex-col'> 
      <form className='flex-1 place-self-center flex flex-col gap-y-6 pb-24 p-6 mt-4 '>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-2 text-center text-2xl font-extrabold text-gray-900">Are you a gurjar?</h2>
    </div> 
         <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Yes</button>
         <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">No</button>
      </form>
    </div>
  </div>

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
            <option value="">Aaga</option>
            <option value="">Aahaar</option>
            <option value="">Aambia</option>
            <option value="">Aamek</option>
            <option value="">Aana</option>
            <option value="">Aanta</option>
            <option value="">Aastha</option>
            <option value="">Aasya</option>
            <option value="">Abhar</option>
            <option value="">Aawet</option>
            <option value="">Acchwan</option>
            <option value="">Achal</option>
            <option value="">Adaan</option>
            <option value="">Adhana</option>
            <option value="">Aftali</option>
            <option value="">Agarwal</option>
            <option value="">Agchal</option>
            <option value="">Agnikul</option>
            <option value="">Ahar</option>
            <option value="">Ahawana</option>
            <option value="">Aheer</option>
            <option value="">Aheewaal</option>
            <option value="">Ahiwaal</option>
            <option value="">Ahmana</option>
            <option value="">Airri</option>
            <option value="">Ajar</option>
            <option value="">Alkari</option>
            <option value="">Almeecha</option>
            <option value="">Amarwaal</option>
            <option value="">Ambak</option>
            <option value="">Ambawata</option>
            <option value="">Amir</option>
            <option value="">Amitt</option>
            <option value="">Amni</option>
            <option value="">Amolia</option>
            <option value="">Amrana</option>
            <option value="">Amta</option>
            <option value="">Anandma</option>
            <option value="">Andana</option>
            <option value="">Andarwar</option>
            <option value="">Andoh</option>
            <option value="">Anhya</option>
            <option value="">Anjana</option>
            <option value="">Anolehra</option>
            <option value="">Anta</option>
            <option value="">Antowa</option>
            <option value="">Antu</option>
            <option value="">Aohana</option>
            <option value="">Aptali</option>
            <option value="">Arwaal</option>
            <option value="">Asaria</option>
            <option value="">Asool</option>
            <option value="">Aswaar</option>
            <option value="">Asya</option>
            <option value="">Atala</option>
            <option value="">Athwaal</option>
            <option value="">Athwaar</option>
            <option value="">Atkia</option>
            <option value="">Atlana</option>
            <option value="">Atrusi</option>
            <option value="">Attrie</option>
            <option value="">Auwaal</option>
            <option value="">Awaar</option>
            <option value="">Awana</option>
            <option value="">Awanti</option>
            <option value="">Awer</option>
            <option value="">Awwal</option>
            <option value="">Ayeri</option>
            <option value="">Ayeseriya</option>
            <option value="">Aswaal</option>
            <option value="">Andwana</option>
            <option value="">Andwad</option>
            <option value="">Ahir</option>
            <option value="">aawana</option>
            <option value="">Ahiwal</option>
            <option value="">Amerwal</option>
            <option value="">Amarwal</option>
            <option value="">Atkiya</option>
            <option value="">Aswar</option>
            <option value="">Almicha</option>
            <option value="">Annadma</option>
            <option value="">Andow</option>
            <option value="">Amelia</option>
            <option value="">Anolehrra</option>           
               <option value="">Baadsoya</option> 
               <option value="">Baalsi</option> 
               <option value="">Baanar</option> 
               <option value="">Baanja</option> 
               <option value="">Baankar</option> 
               <option value="">Baanth</option> 
               <option value="">Baarat</option> 
               <option value="">Baarsi</option> 
               <option value="">Baaru</option> 
               <option value="">Babaniyan</option> 
               <option value="">Babar</option> 
               <option value="">Babeli</option> 
               <option value="">Baben</option> 
               <option value="">Badaankhail</option> 
               <option value="">Badaanzaiin</option> 
               <option value="">Badi</option> 
               <option value="">Badiyawal</option> 
               <option value="">Bag</option> 
               <option value="">Bagada</option> 
               <option value="">Bagadi</option> 
               <option value="">Bagadwal</option> 
               <option value="">Bagela</option> 
               <option value="">Baghaar</option> 
               <option value="">Baghdab</option> 
               <option value="">Baghela</option> 
               <option value="">Baghran</option> 
               <option value="">Bagri</option> 
               <option value="">Bagwar</option> 
               <option value="">Bahambar</option> 
               <option value="">Baharoj</option> 
               <option value="">Baharwaal</option> 
               <option value="">Bahhoja</option> 
               <option value="">Baila</option> 
               <option value="">Bairpur</option> 
               <option value="">Bajaad</option> 
               <option value="">Bajar</option> 
               <option value="">Bajran</option> 
               <option value="">Bakar</option> 
               <option value="">Bakarwal</option> 
               <option value="">Bakkhan</option> 
               <option value="">Bakwal</option> 
               <option value="">Bala</option> 
               <option value="">Balana</option> 
               <option value="">Balasia</option> 
               <option value="">Baloch</option> 
               <option value="">Balot</option> 
               <option value="">Balsi</option> 
               <option value="">Balsiya</option> 
               <option value="">Bandra</option> 
               <option value="">Bania</option> 
               <option value="">Banian</option> 
               <option value="">Banja</option> 
               <option value="">Banjarra</option> 
               <option value="">Bankar</option> 
               <option value="">Bansal</option> 
               <option value="">Bainsla</option> 
               <option value="">Banslay</option> 
               <option value="">Bansrota</option> 
               <option value="">Banth</option> 
               <option value="">Barad</option> 
               <option value="">Barah</option> 
               <option value="">Barasiwala</option> 
               <option value="">Barban</option> 
               <option value="">Barbara</option> 
               <option value="">Barbark</option> 
               <option value="">Bargu</option> 
               <option value="">Barhela</option> 
               <option value="">Barkat</option> 
               <option value="">Baro</option> 
               <option value="">Barraich</option> 
               <option value="">Barsoya</option> 
               <option value="">Barwal</option> 
               <option value="">Bashia</option> 
               <option value="">Basista</option> 
               <option value="">Basoya</option> 
               <option value="">Baswaal</option> 
               <option value="">Batar</option> 
               <option value="">Bathaya</option> 
               <option value="">Bathoya</option> 
               <option value="">Batt</option> 
               <option value="">Bawaar</option> 
               <option value="">Bawla</option> 
               <option value="">Bayle</option> 
               <option value="">Baylood</option> 
               <option value="">Beeten</option> 
               <option value="">Behlot</option> 
               <option value="">Belar</option> 
               <option value="">Beli</option> 
               <option value="">Belu</option> 
               <option value="">Bensla</option> 
               <option value="">Bentar</option> 
               <option value="">Berpur</option> 
               <option value="">Bettan</option> 
               <option value="">Bhaaru</option> 
               <option value="">Bhaarvi</option> 
               <option value="">Bhaatiya</option> 
               <option value="">Bhadak</option> 
               <option value="">Bhadana</option> 
               <option value="">Bhadarvia</option> 
               <option value="">Bhadoria</option> 
               <option value="">Bhagela</option> 
               <option value="">Bhagroot</option> 
               <option value="">Bhahaloot</option> 
               <option value="">Bhahela</option> 
               <option value="">Bhaleesar</option> 
               <option value="">Bhalot</option> 
               <option value="">Bhamer</option> 
               <option value="">Bhanbar</option> 
               <option value="">Bhanbla</option> 
               <option value="">Bhand</option> 
               <option value="">Bhansasir</option> 
               <option value="">Bharavi</option> 
               <option value="">Bhardia</option> 
               <option value="">Bhargad</option> 
               <option value="">Bhargot</option> 
               <option value="">Bharia</option> 
               <option value="">Bharo</option> 
               <option value="">Bharoya</option> 
               <option value="">Bharwal</option> 
               <option value="">Bhati</option> 
               <option value="">Bhatia</option> 
               <option value="">Bhatnia</option> 
               <option value="">Bhatria</option> 
               <option value="">Bhatti</option> 
               <option value="">Bhatwar</option> 
               <option value="">Bhedia</option> 
               <option value="">Bhedwal</option> 
               <option value="">Bhemala</option> 
               <option value="">Bhent</option> 
               <option value="">Bhmaber</option> 
               <option value="">Bhoja</option> 
               <option value="">Bhoken</option> 
               <option value="">Bhosan</option> 
               <option value="">Bhoya</option> 
               <option value="">Bhradi</option> 
               <option value="">Bhratia</option> 
               <option value="">Bhtia</option> 
               <option value="">Bhubla</option> 
               <option value="">Bhulesar</option> 
               <option value="">Bhumbla</option> 
               <option value="">Bhunchhor</option> 
               <option value="">Bidhuri</option> 
               <option value="">Bira</option> 
               <option value="">Birana</option> 
               <option value="">Birgoojur</option> 
               <option value="">Birla</option> 
               <option value="">Birputra</option> 
               <option value="">Bobda</option> 
               <option value="">Bobdiya</option> 
               <option value="">Bogar</option> 
               <option value="">Bokan</option> 
               <option value="">Bokar</option> 
               <option value="">Bokra</option> 
               <option value="">Bora</option> 
               <option value="">Borasi</option> 
               <option value="">Boredia</option> 
               <option value="">Bosan</option> 
               <option value="">Bose</option> 
               <option value="">Brora</option> 
               <option value="">BudGujjar</option> 
               <option value="">Budana</option> 
               <option value="">Bundel</option> 
               <option value="">Bahardoj</option> 
               <option value="">Bhoonchh</option> 
               <option value="">Bhamra</option> 
               <option value="">Bagar</option> 
               <option value="">Baisoya</option> 
               <option value="">Bosatta</option> 
               <option value="">Besoya</option> 
               <option value="">Baloot</option> 
               <option value="">Bakhhan</option> 
               <option value="">Badgurjar</option> 
               <option value="">Barbar</option> 
               <option value="">Baharwal</option> 
               <option value="">Baswal</option> 
               <option value="">Bataar</option> 
               <option value="">Bathoia</option> 
               <option value="">Bijayran</option> 
               <option value="">Bhovia</option> 
               <option value="">Chaap</option> 
               <option value="">Chabara</option> 
               <option value="">Chad</option> 
               <option value="">Chadak</option> 
               <option value="">Chahada</option> 
               <option value="">Chahadri</option> 
               <option value="">Chahadry</option> 
               <option value="">Chahar</option> 
               <option value="">Chakoor</option> 
               <option value="">Chala</option> 
               <option value="">Chalachal</option> 
               <option value="">Chalok</option> 
               <option value="">Chalor</option> 
               <option value="">Chalotia</option> 
               <option value="">Chalrawa</option> 
               <option value="">Chalukya</option> 
               <option value="">Chaman</option> 
               <option value="">Chanair</option> 
               <option value="">Chanana</option> 
               <option value="">Chanchi</option> 
               <option value="">Chandar</option> 
               <option value="">Chandel</option> 
               <option value="">Chandela</option> 
               <option value="">Chandila</option> 
               <option value="">Chandna</option> 
               <option value="">Chando</option> 
               <option value="">Chandor</option> 
               <option value="">Chandra</option> 
               <option value="">Chandrawat</option> 
               <option value="">Chandyala</option> 
               <option value="">Chaneer</option> 
               <option value="">Chaneji</option> 
               <option value="">Chanet</option> 
               <option value="">Channanay</option> 
               <option value="">Chanpay</option> 
               <option value="">Chappar</option> 
               <option value="">Chaprana</option> 
               <option value="">Charan</option> 
               <option value="">Charlay</option> 
               <option value="">Chauhan</option> 
               <option value="">Chavhan</option> 
               <option value="">Chavinda</option> 
               <option value="">Chawara</option> 
               <option value="">Chawda</option> 
               <option value="">Chawla</option> 
               <option value="">Chechi</option> 
               <option value="">Chelarwal</option> 
               <option value="">Chetrana</option> 
               <option value="">Chhachhiyaar</option> 
               <option value="">Chhalay</option> 
               <option value="">Chhali</option> 
               <option value="">Chhalotte</option> 
               <option value="">Chhamber</option> 
               <option value="">Chhaparwaal</option> 
               <option value="">Chhawala</option> 
               <option value="">Chhawari</option> 
               <option value="">Chhodi</option> 
               <option value="">Chhokar</option> 
               <option value="">Chhori</option> 
               <option value="">Chhotkaana</option> 
               <option value="">Chhotkala</option> 
               <option value="">Chitnara</option> 
               <option value="">Chobra</option> 
               <option value="">Chodana</option> 
               <option value="">Chodda</option> 
               <option value="">Chohar</option> 
               <option value="">Chohlay</option> 
               <option value="">Cholee</option> 
               <option value="">Chondrah</option> 
               <option value="">Chopra</option> 
               <option value="">Chora</option> 
               <option value="">Chowinda</option> 
               <option value="">Chohan</option> 
               <option value="">Chouhan</option> 
               <option value="">GujarChapa</option> 
               <option value="">Chokker</option> 
               <option value="">chhoker</option> 
               <option value="">Chandana</option> 
               <option value="">Chap</option> 
               <option value="">Char</option> 
               <option value="">Chawada</option> 
               <option value="">Chhabadi</option> 
               <option value="">Chhaparwal</option> 
               <option value="">Chhohar</option> 
               <option value="">Chhonkar</option> 
               <option value="">Chopada</option> 
               <option value="">Choras</option> 
               <option value="">Chorra</option> 
               <option value="">Choudhry</option> 
               <option value="">Daabhi</option> 
               <option value="">Dagur</option> 
               <option value="">Dahad</option> 
               <option value="">Dahal</option> 
               <option value="">Dahia</option> 
               <option value="">Dahimaor</option> 
               <option value="">Daima</option> 
               <option value="">Daindi</option> 
               <option value="">Daliya</option> 
               <option value="">Dami</option> 
               <option value="">Dangas</option> 
               <option value="">Dangi</option> 
               <option value="">Dape</option> 
               <option value="">Dargas</option> 
               <option value="">Darna</option> 
               <option value="">Daryaan</option> 
               <option value="">Dasa</option> 
               <option value="">Dayama</option> 
               <option value="">Dayora</option> 
               <option value="">Ded</option> 
               <option value="">Dedha</option> 
               <option value="">Dedhar</option> 
               <option value="">Dedva</option> 
               <option value="">Deepe</option> 
               <option value="">Deeva</option> 
               <option value="">Denda</option> 
               <option value="">Dere</option> 
               <option value="">Deria</option> 
               <option value="">Deshmuk</option> 
               <option value="">Devade</option> 
               <option value="">Devda</option> 
               <option value="">Devdhar</option> 
               <option value="">Deyele</option> 
               <option value="">Dhadadiya</option> 
               <option value="">Dhadak</option> 
               <option value="">Dhakar</option> 
               <option value="">Dhama</option> 
               <option value="">Dhandia</option> 
               <option value="">Dhangad</option> 
               <option value="">Dhangar</option> 
               <option value="">Dhanyak</option> 
               <option value="">Dharandia</option> 
               <option value="">Dharawata</option> 
               <option value="">Dhedar</option> 
               <option value="">Dhhao</option> 
               <option value="">Dhharwal</option> 
               <option value="">Dhind</option> 
               <option value="">Dhinda</option> 
               <option value="">Dhonana</option> 
               <option value="">Dhonchak</option> 
               <option value="">Dhond</option> 
               <option value="">Dhoyak</option> 
               <option value="">Dhoye</option> 
               <option value="">Dingay</option> 
               <option value="">Dipa</option> 
               <option value="">Diya</option> 
               <option value="">Doda</option> 
               <option value="">Doday</option> 
               <option value="">Doga</option> 
               <option value="">Dohiya</option> 
               <option value="">Doi</option> 
               <option value="">Doila</option> 
               <option value="">Donk</option> 
               <option value="">Dor</option> 
               <option value="">Dorata</option> 
               <option value="">Doray</option> 
               <option value="">Dorelia</option> 
               <option value="">Dosod</option> 
               <option value="">Dugas</option> 
               <option value="">Dund</option> 
               <option value="">Daraoti</option> 
               <option value="">Dhhinda</option> 
               <option value="">Fagana</option> 
               <option value="">Falda</option> 
               <option value="">Famada</option> 
               <option value="">Fatali</option> 
               <option value="">Fatyan</option> 
               <option value="">Fawal</option> 
               <option value="">Folad</option> 
               <option value="">Gaad</option> 
               <option value="">Gaalgal</option> 
               <option value="">Gaanghela</option> 
               <option value="">Gaathela</option> 
               <option value="">Gachalia</option> 
               <option value="">Gaddri</option> 
               <option value="">Gadi</option> 
               <option value="">Gahalot</option> 
               <option value="">Gaharwal</option> 
               <option value="">Gahinder</option> 
               <option value="">Gaigi</option> 
               <option value="">Gairathi</option> 
               <option value="">Gairr</option> 
               <option value="">Gaj</option> 
               <option value="">Gajgahi</option> 
               <option value="">Galeria</option> 
               <option value="">Galoot</option> 
               <option value="">Gamti</option> 
               <option value="">Gangahala</option> 
               <option value="">Gangar</option> 
               <option value="">Gangoh</option> 
               <option value="">Garahwaal</option> 
               <option value="">Gararr</option> 
               <option value="">Garasia</option> 
               <option value="">Gardi</option> 
               <option value="">Garewaal</option> 
               <option value="">Gargar</option> 
               <option value="">Gari</option> 
               <option value="">Garla</option> 
               <option value="">Garolia</option> 
               <option value="">Garoryar</option> 
               <option value="">Gartal</option> 
               <option value="">Garwal</option> 
               <option value="">Gasetay</option> 
               <option value="">Gathela</option> 
               <option value="">Geda</option> 
               <option value="">Geed</option> 
               <option value="">Gehsan</option> 
               <option value="">Ghaagal</option> 
               <option value="">Ghaakla</option> 
               <option value="">Ghabela</option> 
               <option value="">Ghagal</option> 
               <option value="">Ghaghla</option> 
               <option value="">Ghail</option> 
               <option value="">Ghalwat</option> 
               <option value="">Ghanada</option> 
               <option value="">Ghanda</option> 
               <option value="">Ghangas</option> 
               <option value="">Gharad</option> 
               <option value="">Ghararr</option> 
               <option value="">Ghariya</option> 
               <option value="">Gharwal</option> 
               <option value="">Gharya</option> 
               <option value="">Ghila</option> 
               <option value="">Ghodarop</option> 
               <option value="">Ghola</option> 
               <option value="">Ghorey</option> 
               <option value="">Ghorhaal</option> 
               <option value="">Ghorsior</option> 
               <option value="">Ghosi</option> 
               <option value="">Ghotra</option> 
               <option value="">Gidi</option> 
               <option value="">Gochana</option> 
               <option value="">Godwana</option> 
               <option value="">Gogala</option> 
               <option value="">Gogi</option> 
               <option value="">Gogla</option> 
               <option value="">Gohal</option> 
               <option value="">Gojar</option> 
               <option value="">Gojarwaal</option> 
               <option value="">Gola</option> 
               <option value="">Gonchal</option> 
               <option value="">Gonjal</option> 
               <option value="">Goop</option> 
               <option value="">Gopia</option> 
               <option value="">Gopiliya</option> 
               <option value="">Goras</option> 
               <option value="">Gorasia</option> 
               <option value="">Gorewaha</option> 
               <option value="">Gorhaal</option> 
               <option value="">Gori</option> 
               <option value="">Goria</option> 
               <option value="">Goriagorr</option> 
               <option value="">Goriya</option> 
               <option value="">Gorsi</option> 
               <option value="">Gorya</option> 
               <option value="">Goryagor</option> 
               <option value="">Gosi</option> 
               <option value="">Gotalwal</option> 
               <option value="">Gotelia</option> 
               <option value="">Gugare</option> 
               <option value="">Gujal</option> 
               <option value="">Gujar</option> 
               <option value="">Gujaral</option> 
               <option value="">Gujgahiya</option> 
               <option value="">Gujjral</option> 
               <option value="">Gujral</option> 
               <option value="">Gujrik</option> 
               <option value="">Gulhat</option> 
               <option value="">Gungal</option> 
               <option value="">Gurgur</option> 
               <option value="">Gurjar</option> 
               <option value="">Guroryaar</option> 
               <option value="">Gurrla</option> 
               <option value="">Gurrsi</option> 
               <option value="">Gurtal</option> 
               <option value="">Guruchana</option> 
               <option value="">Gurus</option> 
               <option value="">Guruwal</option> 
               <option value="">Gus</option> 
               <option value="">Gutar</option> 
               <option value="">Gachaliya</option> 
               <option value="">Galeeria</option> 
               <option value="">Gangal</option> 
               <option value="">Garatia</option> 
               <option value="">Gaseetay</option> 
               <option value="">Ghaghala</option> 
               <option value="">Ghoraroop</option> 
               <option value="">Hadava</option> 
               <option value="">Hakla</option> 
               <option value="">Hakum</option> 
               <option value="">Hanana</option> 
               <option value="">Haral</option> 
               <option value="">Harsana</option> 
               <option value="">Harshal</option> 
               <option value="">Harsi</option> 
               <option value="">Hathwal</option> 
               <option value="">Hathwan</option> 
               <option value="">Hun</option> 
               <option value="">Harshana</option> 
               <option value="">Itwar</option> 
               <option value="">Jabarhera</option> 
               <option value="">Jabli</option> 
               <option value="">Jagadnia</option> 
               <option value="">Jagal</option> 
               <option value="">Jahial</option> 
               <option value="">Jalay</option> 
               <option value="">Jangada</option> 
               <option value="">Jangal</option> 
               <option value="">Jangee</option> 
               <option value="">Jarija</option> 
               <option value="">Jatal</option> 
               <option value="">Jatala</option> 
               <option value="">Jatu</option> 
               <option value="">Javkhed</option> 
               <option value="">Jawara</option> 
               <option value="">Jhabam</option> 
               <option value="">Jhala</option> 
               <option value="">Jhale</option> 
               <option value="">Jhar</option> 
               <option value="">Jhavana</option> 
               <option value="">Jhavari</option> 
               <option value="">Jhir</option> 
               <option value="">Jhonia</option> 
               <option value="">Jihaja</option> 
               <option value="">Jindar</option> 
               <option value="">Jindhad</option> 
               <option value="">Johia</option> 
               <option value="">Jori</option> 
               <option value="">Jovar</option> 
               <option value="">Joya</option> 
               <option value="">Junjuhia</option> 
               <option value="">Jusat</option> 
               <option value="">Kaad</option> 
               <option value="">Kaadgiya</option> 
               <option value="">Kaanbees</option> 
               <option value="">Kaanhia</option> 
               <option value="">Kaanp</option> 
               <option value="">Kaanwar</option> 
               <option value="">Kaarele</option> 
               <option value="">Kaba</option> 
               <option value="">Kachar</option> 
               <option value="">Kachwaha</option> 
               <option value="">Kadwa</option> 
               <option value="">Kahari</option> 
               <option value="">Kahoor</option> 
               <option value="">Kaira</option> 
               <option value="">Kajar</option> 
               <option value="">Kalach</option> 
               <option value="">Kalas</option> 
               <option value="">Kalisiyan</option> 
               <option value="">Kaliyana</option> 
               <option value="">Kallamor</option> 
               <option value="">Kalmoa</option> 
               <option value="">Kalumba</option> 
               <option value="">Kamard</option> 
               <option value="">Kanaaraa</option> 
               <option value="">Kandjoliya</option> 
               <option value="">Kangas</option> 
               <option value="">Kanhaaya</option> 
               <option value="">Kanhaiya</option> 
               <option value="">Kanhav</option> 
               <option value="">Kansana</option> 
               <option value="">Kanwar</option> 
               <option value="">Kapasiya</option> 
               <option value="">Karaadi</option> 
               <option value="">Karaha</option> 
               <option value="">Karak</option> 
               <option value="">Karas</option> 
               <option value="">Karhana</option> 
               <option value="">Karida</option> 
               <option value="">Karnana</option> 
               <option value="">karode</option> 
               <option value="">Karolia</option> 
               <option value="">Kasana</option> 
               <option value="">Kashay</option> 
               <option value="">Kashiyaab</option> 
               <option value="">Kasira</option> 
               <option value="">Katari</option> 
               <option value="">Kataria</option> 
               <option value="">Kataro</option> 
               <option value="">Kathele</option> 
               <option value="">Katheria</option> 
               <option value="">Katra</option> 
               <option value="">Kaura</option> 
               <option value="">Kawakalmohaya</option> 
               <option value="">Kayosar</option> 
               <option value="">Kazar</option> 
               <option value="">Kechhabro</option> 
               <option value="">Kechi</option> 
               <option value="">Keejar</option> 
               <option value="">Keethhar</option> 
               <option value="">Kele</option> 
               <option value="">Kera</option> 
               <option value="">Kerahna</option> 
               <option value="">Kesaria</option> 
               <option value="">Kethar</option> 
               <option value="">Kethwal</option> 
               <option value="">Khadan</option> 
               <option value="">Khadwa</option> 
               <option value="">Khadwar</option> 
               <option value="">Khaila</option> 
               <option value="">Khaingar</option> 
               <option value="">Khajar</option> 
               <option value="">Khana</option> 
               <option value="">Khapad</option> 
               <option value="">Khar</option> 
               <option value="">Kharal</option> 
               <option value="">Kharay</option> 
               <option value="">Kharhud</option> 
               <option value="">Khari</option> 
               <option value="">Khariyo</option> 
               <option value="">Kharol</option> 
               <option value="">Kharra</option> 
               <option value="">Kharsana</option> 
               <option value="">Kharwa</option> 
               <option value="">Kharwara</option> 
               <option value="">Khatana</option> 
               <option value="">Khatra</option> 
               <option value="">Khatri</option> 
               <option value="">Khedva</option> 
               <option value="">Kheela</option> 
               <option value="">Khepar</option> 
               <option value="">Khera</option> 
               <option value="">Kherodiya</option> 
               <option value="">Khichi</option> 
               <option value="">Khinchi</option> 
               <option value="">Khiroriya</option> 
               <option value="">Khjad</option> 
               <option value="">Khokhhar</option> 
               <option value="">Kholwad</option> 
               <option value="">Khubad</option> 
               <option value="">Kodar</option> 
               <option value="">Kode</option> 
               <option value="">Kohal</option> 
               <option value="">Kohli</option> 
               <option value="">Kondkher</option> 
               <option value="">Kool</option> 
               <option value="">Kori</option> 
               <option value="">Koshak</option> 
               <option value="">Koshani</option> 
               <option value="">Koshiliya</option> 
               <option value="">Kotari</option> 
               <option value="">Kotowal</option> 
               <option value="">Kugsawar</option> 
               <option value="">Kukad</option> 
               <option value="">Kukaswal</option> 
               <option value="">Kulyana</option> 
               <option value="">Kunbi</option> 
               <option value="">Kundwana</option> 
               <option value="">Kurach</option> 
               <option value="">Kurad</option> 
               <option value="">Kusal</option> 
               <option value="">Kushan</option> 
               <option value="">Kuvadia</option> 
               <option value="">Koli</option> 
               <option value="">Kugaswal</option> 
               <option value="">Kapasia</option> 
               <option value="">Laadi</option> 
               <option value="">Laday</option> 
               <option value="">Lahsar</option> 
               <option value="">Lakhad</option> 
               <option value="">Lakhanrai</option> 
               <option value="">Lakra</option> 
               <option value="">Lali</option> 
               <option value="">Lamboor</option> 
               <option value="">Lamdadiya</option> 
               <option value="">Lanbarray</option> 
               <option value="">Lanborr</option> 
               <option value="">Langha</option> 
               <option value="">Lantay</option> 
               <option value="">Laria</option> 
               <option value="">Latala</option> 
               <option value="">Lauka</option> 
               <option value="">Lawada</option> 
               <option value="">Leaua</option> 
               <option value="">Leel</option> 
               <option value="">Letria</option> 
               <option value="">Liarri</option> 
               <option value="">Liasia</option> 
               <option value="">Ligree</option> 
               <option value="">Likhwahan</option> 
               <option value="">Loddishria</option> 
               <option value="">Lodhi</option> 
               <option value="">Lohar</option> 
               <option value="">Lohda</option> 
               <option value="">Lohia</option> 
               <option value="">Lohmoda</option> 
               <option value="">Lohmor</option> 
               <option value="">Lomwar</option> 
               <option value="">Londari</option> 
               <option value="">Lore</option> 
               <option value="">Losar</option> 
               <option value="">Lukhhar</option> 
               <option value="">Lumbar</option> 
               <option value="">Lushar</option> 
               <option value="">Luwa</option> 
               <option value="">Lomod</option> 
               <option value="">Loriya</option>  
               <option value="">Maal</option> 
               <option value="">Madaad</option> 
               <option value="">Madar</option> 
               <option value="">Madhhar</option> 
               <option value="">Madi</option> 
               <option value="">Madricha</option> 
               <option value="">Mahangal</option> 
               <option value="">Mahar</option> 
               <option value="">Mahaysi</option> 
               <option value="">Mahlo</option> 
               <option value="">Mahrane</option> 
               <option value="">Maitrak</option> 
               <option value="">Makaat</option> 
               <option value="">Makad</option> 
               <option value="">Makara</option> 
               <option value="">Makaria</option> 
               <option value="">Makati</option> 
               <option value="">Makha</option> 
               <option value="">Makhwane</option> 
               <option value="">Malani</option> 
               <option value="">Mali</option> 
               <option value="">Maliawat</option> 
               <option value="">Malik</option> 
               <option value="">Malkana</option> 
               <option value="">Mamdot</option> 
               <option value="">Mamian</option> 
               <option value="">Mana</option> 
               <option value="">Mangria</option> 
               <option value="">Manihar</option> 
               <option value="">Mankas-Mandhari</option> 
               <option value="">Maradi</option> 
               <option value="">Mareeda</option> 
               <option value="">Mari</option> 
               <option value="">Marro</option> 
               <option value="">Mashkie</option> 
               <option value="">Mattrik</option> 
               <option value="">Maval</option> 
               <option value="">Mavi</option> 
               <option value="">Mawai</option> 
               <option value="">Media</option> 
               <option value="">Meed</option> 
               <option value="">Meelu</option> 
               <option value="">Meer</option> 
               <option value="">Meerway</option> 
               <option value="">Mehar</option> 
               <option value="">Mehluor</option> 
               <option value="">Mianna</option> 
               <option value="">Mirwani</option> 
               <option value="">Moheelu</option> 
               <option value="">Mokati</option> 
               <option value="">Monan</option> 
               <option value="">Moola</option> 
               <option value="">Mori</option> 
               <option value="">Morsi</option> 
               <option value="">Motale</option> 
               <option value="">Motan</option> 
               <option value="">Motay</option> 
               <option value="">Mothsar</option> 
               <option value="">Motla</option> 
               <option value="">Mott</option> 
               <option value="">Mudail</option> 
               <option value="">Muharsang</option> 
               <option value="">Mukhia</option> 
               <option value="">Munan</option> 
               <option value="">Mundal</option> 
               <option value="">Mundan</option> 
               <option value="">Mundhhar</option> 
               <option value="">Muniya</option> 
               <option value="">Munreera</option> 
               <option value="">Muthsaray</option> 
               <option value="">Mahil</option> 
               <option value="">Nadva</option> 
               <option value="">Nagar</option> 
               <option value="">Naharkhu</option> 
               <option value="">Nakaya</option> 
               <option value="">Nakdia</option> 
               <option value="">Nakhadar</option> 
               <option value="">Nalia</option> 
               <option value="">Nalwa</option> 
               <option value="">Nanda</option> 
               <option value="">Nandot</option> 
               <option value="">Nandwasia</option> 
               <option value="">Nangde</option> 
               <option value="">Napsak</option> 
               <option value="">Narara</option> 
               <option value="">Narolia</option> 
               <option value="">Navadia</option> 
               <option value="">Neemar</option> 
               <option value="">Neesiak</option> 
               <option value="">Nekadi</option> 
               <option value="">Nihad</option> 
               <option value="">Nikumbh</option> 
               <option value="">Nimad</option> 
               <option value="">Nimbol</option> 
               <option value="">Nitad</option> 
               <option value="">Nogiye</option> 
               <option value="">Noon</option> 
               <option value="">Nooray</option> 
               <option value="">Naagar</option> 
               <option value="">Nagadi</option> 
               <option value="">Nooniara</option> 
               <option value="">Ogar</option> 
               <option value="">Ohar</option> 
               <option value="">Omar</option> 
               <option value="">Onata</option> 
               <option value="">Ood</option> 
               <option value="">Oswal</option> 
               <option value="">Othha</option> 
               <option value="">Paaincha</option> 
               <option value="">Pabiya</option> 
               <option value="">Padana</option> 
               <option value="">Padatu</option> 
               <option value="">Padhekar</option> 
               <option value="">Padiaar</option> 
               <option value="">Pagna</option> 
               <option value="">Pahhocha</option> 
               <option value="">Pahmala</option> 
               <option value="">Palampuria</option> 
               <option value="">Palash</option> 
               <option value="">Palwan</option> 
               <option value="">Pamad</option> 
               <option value="">Pamar</option> 
               <option value="">Panchali</option> 
               <option value="">Pandar</option> 
               <option value="">Pandh</option> 
               <option value="">Panhwar</option> 
               <option value="">Panwar</option> 
               <option value="">Parihar</option> 
               <option value="">Parmar</option> 
               <option value="">Partele</option> 
               <option value="">Partihar</option> 
               <option value="">Paryag</option> 
               <option value="">Paswal</option> 
               <option value="">Patao</option> 
               <option value="">Patel</option> 
               <option value="">Pathalia</option> 
               <option value="">Patil</option> 
               <option value="">Patta</option> 
               <option value="">Pattidar</option> 
               <option value="">Paud</option> 
               <option value="">Pavsia</option> 
               <option value="">Pawad</option> 
               <option value="">Pawar</option> 
               <option value="">Payale</option> 
               <option value="">Peelbaar</option> 
               <option value="">Peelwan</option> 
               <option value="">Pesar</option> 
               <option value="">Phadiana</option> 
               <option value="">Phagna</option> 
               <option value="">Phaleesar</option> 
               <option value="">Phalharr</option> 
               <option value="">Phaloot</option> 
               <option value="">Phambarra</option> 
               <option value="">Phambra</option> 
               <option value="">Pholarra</option> 
               <option value="">Phoolra</option> 
               <option value="">Pipalnaria</option>
               <option value="">Piswal</option> 
               <option value="">Podat</option> 
               <option value="">Pojay</option> 
               <option value="">Pokhar</option> 
               <option value="">Polot</option> 
               <option value="">Poni</option> 
               <option value="">Poorr</option> 
               <option value="">Poras</option> 
               <option value="">Poraswal</option> 
               <option value="">Porvia</option> 
               <option value="">Poswal</option> 
               <option value="">Poswalya</option> 
               <option value="">Pouni</option> 
               <option value="">Puar</option> 
               <option value="">Punblay</option> 
               <option value="">Pundir</option> 
               <option value="">Puswadia</option> 
               <option value="">Poshwal</option> 
               <option value="">Puswal</option> 
               <option value="">Pasval</option> 
               <option value="">Qachar</option> 
               <option value="">Qazar</option> 
               <option value="">Radak</option> 
               <option value="">Ragal</option> 
               <option value="">Raggal</option> 
               <option value="">Raghav</option> 
               <option value="">Raiya</option> 
               <option value="">Rajoria</option> 
               <option value="">Rajput</option> 
               <option value="">Ralitay</option> 
               <option value="">Rana</option> 
               <option value="">Ranghad</option> 
               <option value="">Rankiya</option> 
               <option value="">Raonaso</option> 
               <option value="">Ratala</option> 
               <option value="">Rathi</option> 
               <option value="">Rathore</option> 
               <option value="">Ratia</option> 
               <option value="">Rawal</option> 
               <option value="">Rawat</option> 
               <option value="">Rewa</option> 
               <option value="">Rexwal</option> 
               <option value="">Reyana</option> 
               <option value="">Rianrana</option> 
               <option value="">Rind</option> 
               <option value="">Romat</option> 
               <option value="">Rosa</option> 
               <option value="">Roushe</option> 
               <option value="">Rovisay</option> 
               <option value="">Roviseiya</option> 
               <option value="">Runaso</option> 
               <option value="">Rathor</option> 
               <option value="">Renkne</option> 
               <option value="">Saak</option> 
               <option value="">Sagar</option> 
               <option value="">Sahanpaal</option> 
               <option value="">Sailaher</option> 
               <option value="">Sak</option> 
               <option value="">Sakehale</option> 
               <option value="">Sakhura</option> 
               <option value="">Salimania</option> 
               <option value="">Sama</option> 
               <option value="">Samosrya</option> 
               <option value="">Sampaal</option> 
               <option value="">Sanado</option> 
               <option value="">Sangam</option> 
               <option value="">Sango</option> 
               <option value="">Sangrana</option> 
               <option value="">Sangricha</option> 
               <option value="">Sangu</option> 
               <option value="">Sania</option> 
               <option value="">Sanowla</option> 
               <option value="">Sapra</option> 
               <option value="">Sarandana</option> 
               <option value="">Sarara</option> 
               <option value="">Sarawiya</option> 
               <option value="">Sarimal</option> 
               <option value="">Sardana</option> 
               <option value="">Sasodi</option> 
               <option value="">Seagal</option> 
               <option value="">Sehar</option> 
               <option value="">Serada</option> 
               <option value="">SetarSuryavansh</option> 
               <option value="">Shahwla</option> 
               <option value="">Sharimal</option> 
               <option value="">ShukalSi</option> 
               <option value="">Shukkal</option> 
               <option value="">Sial</option> 
               <option value="">Simal</option> 
               <option value="">Sindgav</option> 
               <option value="">Singal</option> 
               <option value="">Sinora</option> 
               <option value="">Siradhna</option> 
               <option value="">Siroh</option> 
               <option value="">Sirwaria</option> 
               <option value="">Sisodia</option> 
               <option value="">Sisood</option> 
               <option value="">Soie</option> 
               <option value="">Solanki</option> 
               <option value="">Sonigar</option> 
               <option value="">Sood</option> 
               <option value="">Sooderpuriay</option> 
               <option value="">Sooja</option> 
               <option value="">Sorath</option> 
               <option value="">Sradhana</option> 
               <option value="">Sua</option> 
               <option value="">Suddhan</option> 
               <option value="">Suhoos</option> 
               <option value="">Sundhal</option> 
               <option value="">SurkiSurwale</option> 
               <option value="">Suthan</option> 
               <option value="">Saramdana</option> 
               <option value="">Sorathh</option> 
               <option value="">Sudan</option> 
               <option value="">Taak</option> 
               <option value="">Taamar</option> 
               <option value="">Taanwar</option> 
               <option value="">Taas</option> 
               <option value="">Tagaar</option> 
               <option value="">Tak</option> 
               <option value="">Takshak</option> 
               <option value="">Takyak</option> 
               <option value=""> Taldara</option> 
               <option value="">Tale</option> 
               <option value="">Tanak</option> 
               <option value="">Tanbali</option> 
               <option value="">Tang</option> 
               <option value="">Tangad</option> 
               <option value="">Tanija</option> 
               <option value="">Tanik</option> 
               <option value="">Tank</option> 
               <option value="">Tanoor</option> 
               <option value="">Tantiya</option> 
               <option value="">Tanwar</option> 
               <option value="">Tarak</option> 
               <option value="">Tatarra</option> 
               <option value="">Tatwadia</option> 
               <option value="">Tawar</option> 
               <option value="">Teda</option> 
               <option value=""> Tedga</option> 
               <option value="">Tedwa</option> 
               <option value="">Tekhan</option> 
               <option value="">Tekia</option> 
               <option value="">Teli</option> 
               <option value="">Tephali</option> 
               <option value=""> Terrowa</option> 
               <option value="">Tetrawal</option> 
               <option value="">Tewad</option> 
               <option value="">Thaakaria</option> 
               <option value="">Thag</option> 
               <option value="">Thakar</option> 
               <option value="">Thakari</option> 
               <option value="">Thakaria </option> 
               <option value="">Thakia </option> 
               <option value="">Thala</option> 
               <option value="">Theckari</option> 
               <option value="">Theekla</option> 
               <option value="">Thekaria</option> 
               <option value="">Thenda</option> 
               <option value="">Thoda</option> 
               <option value="">Thole</option> 
               <option value=""> Thor</option> 
               <option value="">Thurgla</option> 
               <option value="">Tikiya</option> 
               <option value=""> Tintary</option> 
               <option value="">Tobad</option> 
               <option value="">Todia</option> 
               <option value="">Todiwal</option> 
               <option value="">Togaru</option> 
               <option value="">Tokar</option> 
               <option value="">Tomaror</option> 
               <option value="">Tongar</option> 
               <option value="">Tonk</option> 
               <option value="">Tonkan</option> 
               <option value="">Toor</option> 
               <option value=""> Toori</option> 
               <option value="">Topa</option> 
               <option value="">Tour</option> 
               <option value="">Tunga</option> 
               <option value="">Tomar</option> 
               <option value="">Tuar</option> 
               <option value="">Tihala</option> 
               <option value="">Tampali</option> 
               <option value="">Uplan</option> 
               <option value="">Vadher</option> 
               <option value="">Vaghela</option> 
               <option value="">Vahgri</option> 
               <option value="">Vania</option> 
               <option value="">Varma</option> 
               <option value="">Vasoya</option> 
               <option value="">Vasth</option> 
               <option value="">Veergurjar</option> 
               <option value="">Vihun</option> 
               <option value="">Vikal</option> 
               <option value="">Virana</option> 
               <option value="">Virdee</option> 
               <option value="">Visgorus</option> 
               <option value="">Vokkan</option> 
               <option value="">Verma</option> 
               <option value="">Virdi</option> 
               <option value="">Zingta</option> 
               <option value="">Zinta</option> 
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
  </div>
  </div>
  );
};

export default Register;