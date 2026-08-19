import { Login } from './actionsLogin'
import { createClient } from "@/utils/supabase/client";

export default async function LoginForm() {

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Accedi al tuo account</h1>

            <form action={Login}>
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
        </main>
    )
}