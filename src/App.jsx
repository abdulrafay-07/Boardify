import { useState, useEffect } from "react";
import { Menu } from "./components/index";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom"
import Home from "./pages/Home";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false));
  }, [])

  return !loading ? (
    <div>
      <Home />
      <main>
        <Outlet />
      </main>
    </div>
  ) : null
}

export default App;