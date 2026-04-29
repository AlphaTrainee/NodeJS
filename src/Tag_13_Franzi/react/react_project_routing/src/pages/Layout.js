import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {

    const classFunc = ({ isActive }) => {
        return isActive ? "active" : "";
    };
    
    return (
        <div>
            <header>
                <nav>
                    <NavLink to="/" end className={ classFunc }>Home</NavLink>
                    <NavLink to="/about" end className={ classFunc }>About</NavLink>
                    <NavLink to="/about/team" className={ classFunc }>Team</NavLink>
                    <NavLink to="/references" className={ classFunc }>References</NavLink>
                    <NavLink to="/contact" className={ classFunc }>Contact</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <p>Copyright 2026 ich@mail.de</p>
            </footer>
        </div>
    );
}

export default Layout;