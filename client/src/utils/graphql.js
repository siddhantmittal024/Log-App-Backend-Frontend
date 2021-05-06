import { gql } from '@apollo/client';

export const FETCH_USER_LOGS = gql`
  {
    getUserLogs {
      id
      phoneNumber
      text
      createdAt
      user
    }
  }
`;

export const FETCH_ALL_USERS = gql`
  {
    getAllUsers {
      id
      name
      email
      role
    }
  }
`;
