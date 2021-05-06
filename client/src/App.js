import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { AuthProvider } from './utils/auth';
import AuthRoute from './utils/authRoute';
import AdminRoute from './utils/adminRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';
import LogTable from './components/LogTable';
import LogForm from './components/LogForm';
import UserTable from './components/UserTable';
import UpdateUser from './pages/UpdateUser';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <AdminRoute exact path="/createUser" component={SignUp} />
          <AdminRoute exact path="/updateUser/:userId" component={UpdateUser} />
          <AdminRoute exact path="/showUsers" component={UserTable} />
          <AuthRoute exact path="/userLogs" component={LogTable} />
          <AuthRoute exact path="/createLog" component={LogForm} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
