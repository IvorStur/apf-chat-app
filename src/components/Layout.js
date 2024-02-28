import { Outlet, useNavigate } from "react-router-dom";
import { loggedInContext } from "../context/loggedInContext";
import { useEffect, useState } from "react";

const Layout = () => {

  // const [value, setValue] = useState();

  //   const refresh = ()=>{
  //       // re-renders the component
  //       setValue({});
  //   }
  // const navigate = useNavigate()
  // useEffect(() => {
  //   refresh()
  // }, [navigate])
  // if (!localStorage.getItem("loggedIn")) {
    return (    
        <div className="min-h-screen bg-pink-200"><nav class="bg-pink-200 border-gray-200 dark:bg-pink-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://pornhub.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://i.pinimg.com/originals/9b/70/73/9b7073f4f00ccf0481dac3c8b389f3ae.jpg" class="h-8" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ivor</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-pink-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto bg-pink-200" id="navbar-default">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-pink-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-pink-800 md:dark:bg-pink-900 dark:border-gray-700">
                        <li>
                            <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                        </li>
                        
                        {!localStorage.getItem('loggedIn') && (
                          
                            
                        <li>
                            <a href="/login" class="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                        </li>
                            )}
                        {!localStorage.getItem('loggedIn') && (
                        <li>
                            <a href="/register" class="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                        </li>
                        )}

                        <li>
                            <a href="/cookie" class="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent">Cookie home page</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav><Outlet /></div>
    
  
    )

  // }
  // return (    
  //     <div className="min-h-screen bg-pink-200"><nav class="bg-pink-200 border-gray-200 dark:bg-pink-900">
  //         <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  //             <a href="https://pornhub.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
  //                 <img src="https://i.pinimg.com/originals/9b/70/73/9b7073f4f00ccf0481dac3c8b389f3ae.jpg" class="h-8" alt="Flowbite Logo" />
  //                 <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ivor</span>
  //             </a>
  //             <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-pink-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
  //                 <span class="sr-only">Open main menu</span>
  //                 <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
  //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
  //                 </svg>
  //             </button>
  //             <div class="hidden w-full md:block md:w-auto bg-pink-200" id="navbar-default">
  //                 <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-pink-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-pink-800 md:dark:bg-pink-900 dark:border-gray-700">
  //                     <li>
  //                         <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
  //                     </li>
                    
  //                     <li>
  //                         <a href="/cookie" class="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent">Cookie home page</a>
  //                     </li>
  //                 </ul>
  //             </div>
  //         </div>
  //     </nav><Outlet /></div>
  

  // )
};

export default Layout;