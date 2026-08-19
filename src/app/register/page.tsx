import { register } from './actions'

export default function RegisterPage() {
    return (
        <main style={{ padding: '2rem' }}>
            <h1>Crea un account</h1>

            <form action={register}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required />
                </div>

                <button type="submit">Registrati</button>
            </form>
        </main>
    )
}