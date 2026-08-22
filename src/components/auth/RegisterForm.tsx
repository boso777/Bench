'use client'

import { register } from './actionRegister'

import { useAuth } from '../../app/context/AuthContext'
import { useActionState } from 'react'
export default function RegisterForm() {


    const { activeForm, setActiveForm } = useAuth();
    const [state, actionsRegister, isPending] = useActionState(register, null)
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/30 flex flex-col'>




            <form action={actionsRegister}>

                <div className='flex align-middle justify-between'>
                    <p>Registrati su Bench !</p>
                    <button type="button" onClick={() => { setActiveForm(0) }}>X</button>

                </div>
                <div className='flex gap-6'>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required />
                </div>

                <div className='flex gap-6'>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required />
                </div>

                <button type="submit">Registrati</button>
            </form>

            {state?.error && (
                <div className='p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center'>
                    {state.error}
                </div>
            )}
        </div>
    )
}