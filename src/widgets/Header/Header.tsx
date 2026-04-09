import styles from './Header.module.css'
import {NavLink, Outlet} from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <NavLink to='/'
                             className={({isActive}) => isActive ? styles.active : ''}
                             end
                    >
                        Все котики
                    </NavLink>
                    <NavLink to='/favourites'
                             className={({isActive}) => isActive ? styles.active : ''}
                    >
                        Любимые Котики
                    </NavLink>
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </>
    );
};

export default Header;