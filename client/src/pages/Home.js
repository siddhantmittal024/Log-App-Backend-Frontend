import React, { useContext } from 'react';
import { AuthContext } from '../utils/auth';

const Home = () => {
  const { user } = useContext(AuthContext);

  const homePage = user ? (
    user.role === 'admin' ? (
      <>
        <div>
          <h1 style={{ textAlign: 'center', marginTop: '80px' }}>
            WELCOME TO THE LOGS APP
          </h1>
          <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
            You are an Admin
          </h2>
        </div>
      </>
    ) : (
      <>
        <div>
          <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
            WELCOME TO THE LOGS APP
          </h1>
          <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
            You are a User
          </h2>
        </div>
      </>
    )
  ) : (
    <>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '60px' }}>
          WELCOME TO THE LOGS APP
        </h1>
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
          Please Login to Proceed!!!
        </h2>
        <h2 style={{ textAlign: 'center', marginTop: '90px' }}>
          Created & Designed by: SIDDHANT MITTAL 🤩
        </h2>
      </div>
    </>
  );

  return homePage;
};

export default Home;
