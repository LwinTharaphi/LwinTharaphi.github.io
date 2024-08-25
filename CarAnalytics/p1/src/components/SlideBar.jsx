import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = ({ sidebarWidth = '250px', carCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation(); // Get current route

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: '0', // Sidebar always visible
    width: sidebarWidth,
    height: '100%',
    backgroundColor: '#343a40',
    zIndex: 999,
    paddingTop: '50px', 
  };

  const ulStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  };

  const liStyle = {
    padding: '15px 20px',
  };

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  };

  const iconStyle = {
    marginRight: '10px',
  };

  // Define the menu items
  const menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt', path: '/' },
    { name: `Highlighted Cars`, icon: 'fas fa-star', path: '/highlighted-cars' , badgeCount: carCount,},
  ];

  // Filter the menu items based on the search term
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine the active link style
  const activeLinkStyle = {
    color: '#f8f9fa',
    backgroundColor: '#495057',
    borderRadius: '4px',
  };

  return (
    <div>
      <div style={sidebarStyle}>
        {/* Search input */}
        <div className="p-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <ul style={ulStyle}>
          {filteredMenuItems.map(item => (
            <li key={item.name} style={liStyle}>
              <Link
                to={item.path}
                style={{
                  ...linkStyle,
                  ...(location.pathname === item.path ? activeLinkStyle : {})
                }}
              >
                <i className={item.icon} style={iconStyle}></i> {item.name}
                {item.badgeCount > 0 && (
                  <span className="badge bg-white rounded-circle ms-2" style={{color: '#214946'}}>{item.badgeCount}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
