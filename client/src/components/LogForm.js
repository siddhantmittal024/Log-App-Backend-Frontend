import React, { useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { FETCH_USER_LOGS } from '../utils/graphql';

const LogForm = (props) => {
  const [errors, setErrors] = useState({});
  const initialState = {
    phoneNumber: '',
    text: ''
  };

  const { onChange, onSubmit, value } = useForm(
    createLogCallback,
    initialState
  );

  const [createLog, { loading }] = useMutation(CREATE_LOG, {
    variables: value,
    refetchQueries: [{ query: FETCH_USER_LOGS }],
    update(_) {
      props.history.push('/userLogs');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: FETCH_USER_LOGS
    //   });
    //   data.getUserLogs = [result.data.createLog, ...data.getUserLogs];
    //   console.log(data);
    //   proxy.writeQuery({ query: FETCH_USER_LOGS, data });
  });

  function createLogCallback() {
    createLog();
  }
  return (
    <div className="log-container">
      <h1
        style={{ textAlign: 'center', marginBottom: '20px', marginTop: '30px' }}
      >
        CREATE LOG
      </h1>
      <Form
        style={{ marginTop: '20px' }}
        size="large"
        onSubmit={onSubmit}
        className={loading ? 'loading' : ''}
      >
        <Form.Input
          label="Phone Number"
          placeholder="Phone Number.."
          name="phoneNumber"
          error={errors.phoneNumber ? true : false}
          type="text"
          value={value.phoneNumber}
          onChange={onChange}
        />
        <TextArea
          placeholder="Description..."
          value={value.text}
          name="text"
          length="160"
          //error={errors.text ? true : false}
          onChange={onChange}
        />
        <Button style={{ marginTop: '30px' }} type="submit" secondary>
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

const CREATE_LOG = gql`
  mutation createLog($phoneNumber: String!, $text: String!) {
    createLog(phoneNumber: $phoneNumber, text: $text) {
      id
      phoneNumber
      text
      user
      createdAt
    }
  }
`;

export default LogForm;
