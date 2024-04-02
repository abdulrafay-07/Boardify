import React from 'react';
import { Menu, Welcome } from '../components/index';
import { useSelector } from 'react-redux';
import { Login } from './index';

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.status);

  return isAuthenticated ? (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center text-7xl md:text-9xl lg:text-[180px] text-gray-500 text-opacity-20 font-primary">Boardify</h1>
      <div className="flex justify-between">
        <div>
            <Menu />
        </div>
        <div>
            <Welcome />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Login />
    </div>
  )
}

export default Home;