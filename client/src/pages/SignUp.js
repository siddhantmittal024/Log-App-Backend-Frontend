import { React, useState } from 'react';
import { Button, Form, Checkbox, Dropdown } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { FETCH_ALL_USERS } from '../utils/graphql';
const options = [
  { text: 'user', value: 'user' },
  { text: 'admin', value: 'admin' }
];
const SignUp = (props) => {
  const [errors, setErrors] = useState({});

  const [checked, setChecked] = useState('');
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  };

  const { onChange, onSubmit, value } = useForm(signUpUser, initialState);

  const [addUser, { loading }] = useMutation(SIGUP_USER, {
    refetchQueries: [{ query: FETCH_ALL_USERS }],
    update(_) {
      props.history.push('/showUsers');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: value
  });

  function signUpUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            marginTop: '30px'
          }}
        >
          CREATE USER
        </h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="name"
          type="text"
          error={errors.name ? true : false}
          value={value.name}
          onChange={onChange}
        />
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={value.confirmPassword}
          onChange={onChange}
        />
        <div className="form-lower-container">
          <div className="form-lower-container">
            <Dropdown
              selection
              options={options}
              name="role"
              value={value.role}
              style={{
                margin: 'auto',
                marginBottom: '20px'
              }}
              placeholder="Choose the Role"
              position="center"
              onChange={onChange}
            />

            <Button type="submit" secondary>
              Submit
            </Button>
          </div>
        </div>
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

const SIGUP_USER = gql`
  mutation signUp(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      registerInput: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      name
      email
      role
      token
      createdAt
    }
  }
`;

export default SignUp;
