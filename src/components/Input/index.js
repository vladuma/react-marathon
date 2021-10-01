import cn from 'classnames';
import style from './style.module.css';

const Input = ({ value, label, type, name, required, onChange }) => {
    return (
        <div className={style.root}>
            <input
                value={value}
                type={type || 'text'}
                name={name}
                className={cn(style.input, {
                    [style.valid]: value && value.length > 0,
                })}
                required={required}
                onChange={onChange}
            />
            <span
                className={style.highlight}
            ></span>
            <span
                className={style.bar}
            ></span>
            <label 
                className={style.label}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
