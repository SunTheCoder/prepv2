import {useState } from "react"
import { signup } from "../utils/api"



const SignUp = () => {

    const [form, setForm] = useState({ 
                                        name: "", 
                                        username: "", 
                                        email: "", 
                                        password: ""
                                    })

    const [message, setMessage] = useState("")

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const data = await signup(form);

        if (data.error) {
            setMessage("Sign up Failed: " + data.error);
        } else {
            setMessage("Sign up successful!")
        }
    }

    return (
        <>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    value={form.name}
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    name="username"
                    type="text"
                    value={form.username}
                    placeholder="username"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="email"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="password"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>

            </form>

            <p>{message}</p>
        
        </>
    )
}

export default SignUp