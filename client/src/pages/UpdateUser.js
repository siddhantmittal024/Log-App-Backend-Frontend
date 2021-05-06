import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { FETCH_ALL_USERS } from '../utils/graphql';
const options = [
  { text: 'user', value: 'user' },
  { text: 'admin', value: 'admin' }
];
const UpdateUser = (props) => {
  const userId = props.match.params.userId;
  //console.log(userId.name);
  //console.log(userId);
  const [errors, setErrors] = useState({});
  const initialState = {
    userId: userId,
    name: '',
    email: '',
    password: '',
    role: 'user'
  };

  //const [value, setValue] = useState({});

  const { onChange, onSubmit, value } = useForm(updateUserData, initialState);

  const [updateUser] = useMutation(UPDATE_USER_DATA, {
    variables: value,
    refetchQueries: [{ query: FETCH_ALL_USERS }],
    update(_) {
      props.history.push('/showUsers');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  });

  function updateUserData() {
    updateUser();
  }

  //const [checked, setChecked] = useState(true);

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit}>
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            marginTop: '30px'
          }}
        >
          UPDATE USER
        </h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="name"
          type="text"
          value={value.name}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          //error={errors.email ? true : false}
          value={value.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          //error={errors.password ? true : false}
          value={value.password}
          onChange={onChange}
        />
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

const UPDATE_USER_DATA = gql`
  mutation updateUser(
    $userId: ID!
    $name: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    updateUser(
      _id: $userId
      input: { name: $name, email: $email, password: $password, role: $role }
    ) {
      id
      name
      email
      role
    }
  }
`;

export default UpdateUser;
