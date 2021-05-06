import { React, useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../utils/auth';

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    email: '',
    password: ''
  };

  const { onChange, onSubmit, value } = useForm(loginInUser, initialState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: value
  });

  function loginInUser() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1>LOGIN</h1>
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={value.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={value.password}
          onChange={onChange}
        />
        <Button type="submit" secondary>
          Submit
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation logIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      role
      token
      createdAt
    }
  }
`;

export default Login;
