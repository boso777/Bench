'use client'

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";


export default function welcome() {

  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(0);


  const opener = (() => {
    if (!isOpen) {
      setIsOpen(true)
      console.log(isOpen)
    } else {
      setIsOpen(false)
      console.log(isOpen)
    }
  })



  switch (activeForm) {
    case 0:
      return void
      break;
    case 1:
      return LoginForm
      break;
    case 2:
      return RegisterForm
      break;
  }





  return (
    <>
      <div className="w-full flex  align-middle justify-between gap-6">

        <div className="flex align-middle justify-center gap-6 m-6">
          <p>Logo</p>
        </div>

        <div className="flex align-middle justify-center gap-6 m-6">
          <div className="flex border-amber-50 border-solid">
            <button onClick={setActiveForm(1)} >Login</button>
          </div>
          <div className="flex border-amber-50 border-solid">
            <button onClick={setActiveForm(2)} >Register</button>
          </div>
        </div>


        <div>
          {register}
          {login}
        </div>


      </div >
    </>
  )
}