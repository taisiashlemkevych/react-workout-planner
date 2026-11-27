import { NavLink, Outlet } from 'react-router-dom';
import './AppLayout.scss';

function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <NavLink to="/" className="app-header__logo">
          Workout Planner
        </NavLink>
        <nav className="app-header__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `app-header__link ${isActive ? 'app-header__link--active' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/workouts"
            className={({ isActive }) =>
              `app-header__link ${isActive ? 'app-header__link--active' : ''}`
            }
          >
            Workouts
          </NavLink>
          <NavLink
            to="/my-plan"
            className={({ isActive }) =>
              `app-header__link ${isActive ? 'app-header__link--active' : ''}`
            }
          >
            My Plan
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `app-header__link ${isActive ? 'app-header__link--active' : ''}`
            }
          >
            History
          </NavLink>
        </nav>
      </header>
      <main className="app-layout__content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>Workout Planner © 2026</p>
      </footer>
    </div>
  );
}

export default AppLayout;
