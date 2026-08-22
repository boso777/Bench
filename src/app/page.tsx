'use client'

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from './context/AuthContext';

export default function welcome() {

  const { activeForm, setActiveForm } = useAuth();
  const [isOpen, setIsOpen] = useState(false);


  const opener = (() => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  })



  const renderForm = () => {
    switch (activeForm) {
      case 1:
        return <LoginForm />
        break;
      case 2:
        return <RegisterForm />
        break;
      default:
        return null;
    }
  };




  return (
    <>

      <div className="bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen">
        <div className="w-full flex  align-middle justify-between gap-6 ">

          <div className="flex align-middle justify-center gap-6 m-6">
            <p>Logo</p>
          </div>
          <div className="flex align-middle justify-center gap-6 m-6">
            <div className="flex border-amber-50 border-solid">
              <button onClick={() => { setActiveForm(1) }} >Login</button>
            </div>
            <div className="flex border-amber-50 border-solid">
              <button onClick={() => { setActiveForm(2) }} >Register</button>
            </div>
          </div>



        </div>

        <div className="flex justify-center items-center h-3/4">
          <p className="font-bold text-6xl">Bench</p>
        </div>


      </div >

      {renderForm()}
    </>
  )
}