import { useState } from 'react';
import Input from '../Input';

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
            <Input
                value={email}
                type="email" 
                name="email" 
                label="Email" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                value={password}
                type="password" 
                name="password" 
                label="Password" 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick}>
                Submit
            </button>
        </div>
    );
};

export default LoginForm;
