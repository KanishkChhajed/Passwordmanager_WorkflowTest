import React from 'react'

const NavBar = () => {
  return (
   <nav className='bg-slate-800 text-white'>
    <div className="mycontainer flex justify-between items-center px-4 h-12 py-7">

    <div className="logo font-bold text-2xl">
      <span className="text-green-500">&lt;</span>
      Sec
      <span className="text-green-500">OP/&gt;</span>
      </div>
    <ul>
        <li className='flex gap-1 md:gap-4 absolute right-16 md:right-20 top-3'>
        <a className='hover:font-bold cursor-pointer' href="/">Home</a>
        <a className='hover:font-bold cursor-pointer' href="/">About</a>
        <a className='hover:font-bold cursor-pointer' href="/">Contact</a>
        </li>
    </ul>
    <button className='flex w-14 rounded-full absolute top-0 right-3' >
      <img className='invert p-4 ' src="https://github.com/favicon.ico" alt="github" />
    </button>
    </div>
   </nav>
  )
}

export default NavBar
