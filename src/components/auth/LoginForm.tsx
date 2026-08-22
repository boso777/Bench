import { Login } from './actionsLogin'
import { createClient } from "@/utils/supabase/client";

import { useAuth } from '../../app/context/AuthContext'

export default function LoginForm() {

    const { activeForm, setActiveForm } = useAuth();

    return (<>
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/30 flex flex-col'>


            <form action={Login}>

                <div className='flex align-middle justify-between'>
                    <p>Accedi al tuo account</p>
                    <button onClick={() => { setActiveForm(0) }}>X</button>
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

        </div>
    </>
    )
}