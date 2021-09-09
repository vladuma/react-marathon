import style from './style.module.css';

const Layout = ({ colorBg, title, descr, urlBg }) => {
    const rootStyles = {
        ...(colorBg && { backgroundColor: colorBg }),
        ...(urlBg && { backgroundImage: `url(${urlBg})` }),
    };
    console.log(rootStyles);
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
                    <div className={`${style.desc} ${style.full}`}>
                        { descr && (<p>{descr}</p>) }
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Layout;