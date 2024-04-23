import { useState } from 'react'

import './App.css'
import mainImage from "./assets/pocketNotesmain.svg"
import lockImage from "./assets/lock.svg"

function App() {


  return (
    <div className='flex flex-row h-dvh'>
      <div className='basis-1/4 flex flex-col relative'>
        <p className='text-2xl font-medium text-center mt-10 font-sans'>Pocket Notes</p>

        <div className='  flex flex-col justify-evenly  px-10 overflow-y-scroll no-scrollbar h-full '>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => <div className='flex flex-row py-3 ' key={x}>
            <div className='rounded-full bg-red-500 w-12 h-12 text-center pt-2 text-xl font-bold font-sans text-white'>MN</div>
            <p className='font-medium  m-auto'>My Notes</p>
          </div>)}
          <div style={{ backgroundColor: "#16008B" }} className=' text-3xl absolute rounded-full bg-red-500 w-12 h-12 text-center pt-0.5  font-bold font-sans text-white bottom-2 right-5'>+</div>
        </div>
      </div> 
      <div className='basis-3/4' style={{ backgroundColor: "#DAE5F5" }}>

        <img src={mainImage} className='m-auto' alt="lockImage" />
        <p className='text-5xl text-center font-bold'>Pocket Notes</p>
        <p className='text-center font-bold'>Send and receive messages without keeping your phone online. <br />Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

        <p className=' fixed bottom-0'>
          <img src={lockImage} alt="LockImage" /> end-to-end encrypted
        </p>
      </div>
    </div>
  )
}

export default App
