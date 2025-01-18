import { useState } from "react"
import { login } from "../utils/api"


const Login = () => {
    const [form, setForm] = useState({ username: "", password: ""})
    const [message, setMessage] = useState("")

    function handleChange(e) {
       setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            const data = await login(form)

            if (data.error) {
                setMessage("Login Failed: " + data.error)
            } else {
                setMessage("Login successful!")
            }

        } catch (error) {

            console.error("Login Failed: ", error)
        }
    }

    return (

        <>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    placeholder="benny123"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Ilikesecurity123"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <p>{message}</p>
        </>

    )
}

export default Login