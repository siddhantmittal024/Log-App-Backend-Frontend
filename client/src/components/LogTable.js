import { useQuery } from '@apollo/client';
import React from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';

import { FETCH_USER_LOGS } from '../utils/graphql';
const LogTable = () => {
  //const { user } = useContext(AuthContext);

  const { loading, data, error } = useQuery(FETCH_USER_LOGS);

  console.log(data);

  if (loading) {
    return <>loading</>;
  }
  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>MY LOGS</h1>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Number of Logs: {data.getUserLogs.length}
      </h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">PhoneNumber</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {loading ? (
          <h1>Loading Logs...</h1>
        ) : (
          <Table.Body>
            {data.getUserLogs &&
              data.getUserLogs.map((log) => (
                <Table.Row key={log.id}>
                  <Table.Cell textAlign="center">{log.phoneNumber}</Table.Cell>
                  <Table.Cell textAlign="center">{log.text}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        )}

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default LogTable;
