import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../utils/auth';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const pathName = window.location.pathname;

  const path = pathName === '/' ? 'home' : pathName.substr(1);
  const [active, setActive] = useState(path);

  const handleItemClick = (e, { name }) => setActive(name);

  const menubar = user ? (
    user.role === 'admin' ? (
      <div>
        <Menu size="massive">
          <Menu.Item
            onClick={handleItemClick}
            as={Link}
            to="/"
          >{`Hello, ${user.name}👋`}</Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item
              name="Users"
              active={active === 'Users'}
              onClick={handleItemClick}
              as={Link}
              to="/showUsers"
            />
            <Menu.Item
              name="Add User"
              active={active === 'Add User'}
              onClick={handleItemClick}
              as={Link}
              to="/createUser"
            />
            <Menu.Item
              name="Logs"
              active={active === 'Logs'}
              onClick={handleItemClick}
              as={Link}
              to="/userLogs"
            />
            <Menu.Item
              name="add log"
              active={active === 'add log'}
              onClick={handleItemClick}
              as={Link}
              to="/createLog"
            />
            <Menu.Item name="logout" onClick={logout} as={Link} to="/" />
          </Menu.Menu>
        </Menu>
      </div>
    ) : (
      <div>
        <Menu size="massive">
          <Menu.Item
            onClick={handleItemClick}
            as={Link}
            to="/"
          >{`Hello, ${user.name}👋`}</Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item
              name="Logs"
              active={active === 'Logs'}
              onClick={handleItemClick}
              as={Link}
              to="/userLogs"
            />
            <Menu.Item
              name="add log"
              active={active === 'add log'}
              onClick={handleItemClick}
              as={Link}
              to="/createLog"
            />
            <Menu.Item name="logout" onClick={logout} as={Link} to="/" />
          </Menu.Menu>
        </Menu>
      </div>
    )
  ) : (
    <Menu size="massive">
      <Menu.Item
        name="home"
        active={active === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={active === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
      </Menu.Menu>
    </Menu>
  );

  return menubar;
}

export default NavBar;
