import React from 'react';
import { Menu, Welcome } from '../components/index';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Login } from '../components/index';

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.status);

  return isAuthenticated ? (
    <div className="flex justify-between">
        <div>
            <Menu />
        </div>
        <div>
            <Welcome />
        </div>
    </div>
  ) : (
    <div>
      <Login />
    </div>
  )
}

export default Home;