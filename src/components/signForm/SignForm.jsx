import { useState } from "react";

import './signForm.scss';

const SignForm = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="signForm">
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Электронная почта"
            />
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
            />

            <button
                onClick={() => handleClick(email, password)}
            >
                {title}
            </button>
        </div>
    )
}

export default SignForm