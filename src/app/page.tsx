'use client'

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";


export default function welcome() {

  const [isOpen, setIsOpen] = useState(false);
  const [register, setRegister] = useState(null);
  const [login, setLogin] = useState(null);

  const opener = (() => {
    if (!isOpen) {
      setIsOpen(true)
      console.log(isOpen)
    } else {
      setIsOpen(true)
      console.log(isOpen)
    }
  })

  if (isOpen) {
    setRegister(<RegisterForm />)
    setLogin(<LoginForm />)
  }

  return (
    <>
      <div className="w-full flex  align-middle justify-between gap-6">

        <div className="flex align-middle justify-center gap-6 m-6">
          <p>Logo</p>
        </div>

        <div className="flex align-middle justify-center gap-6 m-6">
          <div className="flex border-amber-50 border-solid">
            <button onClick={opener}>Login</button>
          </div>
          <div className="flex border-amber-50 border-solid">
            <button onClick={opener}>Register</button>
          </div>
        </div>


        <div>
          {register}
          {login}
        </div>


      </div>
    </>
  )
}