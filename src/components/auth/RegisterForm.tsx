import { register } from './actionRegister'
import { createClient } from "@/utils/supabase/client";

export default async function RegisterForm() {

    return (
        <div>
            <h1>Accedi al tuo account</h1>

            <form action={register}>
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
    )
}