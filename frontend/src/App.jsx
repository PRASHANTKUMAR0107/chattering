import { useState } from 'react'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'

function App() {

  return (
    <div className='flex p-4 h-screen items-center justify-center custom-scrollbar'>
      {/* <SignUp/> */}
      <Home/>
    </div>
  )
}

export default App
