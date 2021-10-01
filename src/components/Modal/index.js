import { useRef, useEffect } from 'react';

import cn from 'classnames';
import style from './style.module.css';

const Modal = ({ title, children, isOpen, onModalClose }) => {
    const modalRef = useRef();
    const handleModalClose = () => onModalClose && onModalClose();
    const handleRootClick = (event) => {
        if (!modalRef.current.contains(event.target)) {
            handleModalClose();
        }
    };

    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
        // eslint-disable-next-line
    }, []);

    return (
        <div
            className={cn(style.root, {
                [style.open]: isOpen,
            })}
            onClick={handleRootClick}
        >
            <div className={style.modal} ref={modalRef}>
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
