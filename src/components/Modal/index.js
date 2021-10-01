import cn from 'classnames';
import style from './style.module.css';

const Modal = ({ title, children, isOpen, onModalClose }) => {
    const handleModalClose = () => onModalClose && onModalClose();

    return (
        <div className={cn(style.root, {
                [style.open]: isOpen,
            })}>
            <div className={style.modal}>
                <div className={style.head}>
                    {title}
                    <span
                        className={style.btnClose}
                        onClick={handleModalClose}
                    ></span>
                </div>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
