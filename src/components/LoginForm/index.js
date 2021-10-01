import { useState } from 'react';
import Input from '../Input';
import style from './style.module.css';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('example@test.com');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();

        onSubmit && onSubmit({
            email,
            password,
            isLogin,
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
            <div className={style.wrapper}>
                <button onClick={handleClick}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <button className={style.link} onClick={() => setIsLogin((s) => !s)}>
                    {!isLogin ? 'Login' : 'Register'}?
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
