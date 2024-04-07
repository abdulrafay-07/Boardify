import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { toggleTheme } from "./store/themeSwitcher";
import { Welcome, Menu } from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const theme = useSelector(state => state.theme);
  const status = useSelector(state => state.auth.status)
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

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  }

  return !loading ? (
    <div className={`${theme.theme}`}>
      <div className="dark:bg-neutral-900 dark:text-white bg-white text-neutral-900 flex flex-col lg:flex-row lg:flex lg:justify-evenly">
        {status ? (
            <div>
              <Menu />
              <div className="fixed top-0 right-0 inline-flex">
                <div className="mt-8 cursor-pointer">
                  <MdDarkMode 
                    className="hidden md:block text-3xl dark:text-white" 
                    onClick={handleThemeToggle}
                  />
                </div>
                <div>
                  <Welcome />
                </div>
              </div>
              <MdDarkMode 
                className="md:hidden fixed right-0 top-16 mr-6 mt-2 text-2xl md:text-3xl cursor-pointer z-10 dark-text-white"
                onClick={handleThemeToggle}
              />
            </div>
        ) : null}
      </div>
      <Outlet />
    </div>
  ) : null
}

export default App;