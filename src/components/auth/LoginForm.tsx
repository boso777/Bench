'use client'

import { Login } from './actionsLogin'
import { useActionState } from 'react'
import { useAuth } from '../../app/context/AuthContext'

export default function LoginForm() {

    const { activeForm, setActiveForm } = useAuth();
    const [state, actionsLogin, isPending] = useActionState(Login, null)

    return (<>
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/30 flex flex-col'>


            <form action={actionsLogin}>

                <div className='flex align-middle justify-between'>
                    <p>Accedi al tuo account</p>
                    <button type="button" onClick={() => { setActiveForm(0) }}>X</button>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required />
                </div>

                <button type="submit">Accedi</button>
            </form>

            {state?.error && (
                <div className='p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center'>
                    {state.error}
                </div>
            )}

        </div>
    </>
    )
}