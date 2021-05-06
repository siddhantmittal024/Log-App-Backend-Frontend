import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/auth';

function AdminRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  if (user != null) {
    return (
      <Route
        {...rest}
        render={(props) =>
          user.role === 'admin' ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
  return <Redirect to="/"></Redirect>;
}

export default AdminRoute;
