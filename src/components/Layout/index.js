import cn from 'classnames';
import style from './style.module.css';

const Layout = ({ colorBg, title, descr, urlBg, children }) => {
    const rootStyles = {
        ...(colorBg && { backgroundColor: colorBg }),
        ...(urlBg && { backgroundImage: `url(${urlBg})` }),
    };

    return (
        <section className={style.root}
            style={rootStyles}
        >
            <div className={style.wrapper}>
                <article>
                    <div className={style.title}>
                        { title && (<h3>{title}</h3>) }
                        <span className="separator"></span>
                    </div>
                    <div className={cn(style.desc, style.full)}>
                        { descr && (<p>{descr}</p>) }
                        { children }
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Layout;