import React from 'react';
import { useSelector } from 'react-redux';
import { Login } from './index';

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.status);

  return isAuthenticated ? (
    <div className="dark:bg-neutral-900 dark:text-white bg-white text-neutral-900 flex flex-col justify-center items-center h-screen">
      <h1 className="text-center text-7xl md:text-9xl lg:text-[180px] dark:text-white dark:text-opacity-35 text-gray-500 text-opacity-20 font-primary">Boardify</h1>
    </div>
  ) : (
    <div>
      <Login />
    </div>
  )
}

export default Home;