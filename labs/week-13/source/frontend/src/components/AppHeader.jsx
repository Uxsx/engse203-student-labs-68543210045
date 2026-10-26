import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  ['/', 'Dashboard'],
  ['/requests/new', 'New Request'],
  ['/about', 'About'],
];

function AppHeader() {
  const { user, logout } = useAuth();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 05</p>
          <p className="brand">Campus Service Request</p>
        </div>
        <nav aria-label="เมนูหลัก">
          {links.map(([to, label]) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={to === '/'}
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="auth-box">
          {user ? (
            <>
              <span data-testid="auth-user">{user.name} ({user.role})</span>
              <button className="nav-link" type="button" onClick={logout} data-testid="logout-button">ออกจากระบบ</button>
            </>
          ) : (
            <Link className="nav-link" to="/login" data-testid="login-link">เข้าสู่ระบบ</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
