import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, Table } from 'semantic-ui-react';
import { FETCH_ALL_USERS } from '../utils/graphql';

const UserTable = () => {
  const { loading, data, error } = useQuery(FETCH_ALL_USERS);

  //console.log(data);

  if (loading) {
    return <>loading</>;
  }
  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>ALL USERS</h1>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Number of Users: {data.getAllUsers.length}
      </h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Email</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Role</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {loading ? (
          <h1>Loading Logs...</h1>
        ) : (
          <Table.Body>
            {data.getAllUsers &&
              data.getAllUsers.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell textAlign="center">{user.name}</Table.Cell>
                  <Table.Cell textAlign="center">{user.email}</Table.Cell>
                  <Table.Cell textAlign="center">{user.role}</Table.Cell>
                  <Table.Cell
                    as={Link}
                    to={`/updateUser/${user.id}`}
                  >
                    Edit
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        )}

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
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

export default UserTable;
