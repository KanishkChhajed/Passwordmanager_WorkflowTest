import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col
     justiy-center items-center w-full'>
       <div className="logo font-bold text-2xl">
      <span className="text-green-500">&lt;</span>
      Sec
      <span className="text-green-500">OP/&gt;</span>
      </div>

      <div className='flex gap-1'>
      Created with <lord-icon
    src="https://cdn.lordicon.com/ulnswmkk.json"
    trigger="loop"
    delay="2000"
    colors="primary:#c71f16"
    style={{height:25 + 'px'}}>
</lord-icon> by Coders 
      </div>
    </div>
  )
}

export default Footer
