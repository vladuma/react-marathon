import { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('example@test.com');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault();

        onSubmit && onSubmit({
            email,
            password,
        });

        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <input
                value={email}
                type="text" 
                name="email" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                value={password}
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick}>
                Submit
            </button>
        </div>
    );
};

export default LoginForm;
