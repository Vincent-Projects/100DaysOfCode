import React, { useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    return (
        <div>
            <form>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => props.handleLogin(email, password)}>Login</button>
            </form>
        </div>
    )
}

export default Login;