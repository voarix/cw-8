import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary shadow">
      <div className="container">
        <NavLink
          to="/"
          className="navbar-brand d-flex align-items-center gap-2">
          <h1>Quotes central</h1>
        </NavLink>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Quotes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/quotes/add-quote" className="nav-link">
                Submit new quote
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
