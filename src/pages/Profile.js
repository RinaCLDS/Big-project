import React, {useState} from 'react'
import avatar from '../images/avatar.jpg'

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
  const openDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  return (

    
    <div className="main backg mx-auto">
      <div className="flex justify-between items-center px-7 py-2 bg-gray-900 text-gray-50 shadow">
        <div className="font-bold tracking-wider ">Gurjar.</div>

        <button onClick={openDropdown} className="inline-block h-9 w-9 rounded-full ring-4 ring-transparent hover:ring-slate-800 cursor-pointer active:ring-transparent"><img className="overflow-hidden rounded-full" src={avatar} alt="avatar" /></button>
        {
          isOpen &&
          <div className="absolute right-1 top-10 mt-2 bg-gray-700 divide-y divide-gray-500 rounded-lg shadow-lg z-20">
            <div className="py-3 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {/* Add your dropdown options here */}
              <div className="px-4 text-left text-sm text-gray-50" role="menuitem">Gurjar</div>
              <div className="px-4 text-left text-sm text-gray-50" role="menuitem">Gurjar@gmail.com</div>
            </div>
            <div className="py-1 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {/* Add your dropdown options here */}
              <button className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Dashboard</button>
              <button className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile Settings</button>
              <button className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Points</button>
            </div>
            <div className="py-1 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {/* Add your dropdown options here */}
              <button className="px-4 text-left py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Sign Out</button>
            </div>
          </div>
        }

      </div>

    <div className="section mx-auto gap-6">
<div class="mx-auto flex justify-between items-center sm:w-full lg:w-full  col-span-2 xsm:px-4">
<div class="mx-auto bg-white justify-center py-5 px-3 shadow rounded-lg xsm:px-4">
    <form class="mb-0 space-y-6 ">
    <div className="flex justify-center -mx-2 grid grid-flow-row-dense md:grid-cols-3 xsm:grid-cols-1 lg:grid-cols-3">
    <div class="flex items-center justify-center sm:w-full xsm:px-4">
    <div class="max-w-xl justify-center">
    <div class="bg-white border shadow-xl rounded-lg py-3  ">
        <div class="photo-wrapper p-2">
            <img class="w-32 h-32 rounded-full mx-auto" src={avatar} alt="Name"/>
        </div>
        <h3 class="text-center text-xl text-gray-900 font-medium leading-8">Name</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
                <p>Gurjar ID</p>
            </div>  
        <div class="p-2 grid grid-cols-2 ">
            <table class="flex text-xs">
                <tbody className=''><tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Country</td>
                    <td class="px-2 py-2 text-black">---------------------------</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">State</td>
                    <td class="px-2 py-2 text-black">--------------------------</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">City</td>
                    <td class="px-2 py-2 text-black">--------------------------</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Village</td>
                    <td class="px-2 py-2 text-black">---------------------------</td>
                </tr>
            </tbody></table>

            
            <table class="flex text-xs">
                <tbody><tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Gotra</td>
                    <td class="px-2 py-2 text-black">---------------------------</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Blood group</td>
                    <td class="px-2 py-2 text-black">--------------------------</td>
                </tr>
                <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Date of birth</td>
                    <td class="px-2 py-2 text-black">--------------------------</td>
                </tr>
            </tbody></table>

        </div>
    </div>
</div>
</div>
<div className="flex justify-center -mx-2 grid grid-flow-row-dense col-span-3">
      <div className="w-full sm:col-span-4 lg:col-span-1 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
          Name
        </label>
        <input required  name='name' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 sm-py-1 sm-px-1 sm-b-1 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Full Name"/>
      </div>
      <div className="w-full sm:col-span-4 lg:col-span-1 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
          Gender
        </label>
        <div className="relative">
          <select name='religion' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option>Male</option>
          <option>Female</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div className="w-full sm:col-span-4 lg:col-span-1  px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Date of Birth
        </label>
        <input name='dateBirth' className=" form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="date" placeholder="MM-DD-YYYY" />
      </div>
    <div className="w-full sm:col-span-4 lg:col-span-1 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Religion
        </label>
        <div className="relative">
          <select name='religion' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option>Hindu</option>
          <option>Muslim</option>
          <option>Sikh</option>
          <option>Christian</option>
          <option>Jain</option>
          <option>Buddhism</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      </div>
      <div className="flex lg -mx-2 ">
      <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
          Name
        </label>
        <input required  name='name' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 sm-py-1 sm-px-1 sm-b-1 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Full Name"/>
      </div>
      <div className="w-full  md:w-1/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
          Gender
        </label>
        <div className="relative">
          <select name='religion' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option>Male</option>
          <option>Female</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Date of Birth
        </label>
        <input name='dateBirth' className=" form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="date" placeholder="MM-DD-YYYY" />
      </div>
    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Religion
        </label>
        <div className="relative">
          <select name='religion' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option>Hindu</option>
          <option>Muslim</option>
          <option>Sikh</option>
          <option>Christian</option>
          <option>Jain</option>
          <option>Buddhism</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      </div>
      <div className="flex lg -mx-2 ">
      <div className="w-full  px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
          Name
        </label>
        <input required  name='name' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 sm-py-1 sm-px-1 sm-b-1 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Full Name"/>
      </div>
      <div className="w-full   px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
          Gender
        </label>
        <div className="relative">
          <select name='religion' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option>Male</option>
          <option>Female</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div className="w-full  px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Date of Birth
        </label>
        <input name='dateBirth' className=" form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="date" placeholder="MM-DD-YYYY" />
      </div>
    <div className="w-full px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Religion
        </label>
        <div className="relative">
          <select name='religion' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option>Hindu</option>
          <option>Muslim</option>
          <option>Sikh</option>
          <option>Christian</option>
          <option>Jain</option>
          <option>Buddhism</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      </div>
      </div>
  </form>
  </div>
</div>
</div>
</div>
  );
};

export default Profile;