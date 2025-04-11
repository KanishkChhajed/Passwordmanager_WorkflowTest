import { useState } from 'react'
import NavBar from './component/NavBar'
import Manager from './component/Manager'
import Footer from './component/Footer'

function App() {

  return (
    <>
    <NavBar/>
    {/* background div */}
    <div className='bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
