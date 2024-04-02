import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateBoard, Home, Login, Signup, Board, AllBoards, JoinBoard } from "./pages/index.js"
import { Protected } from './components/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/create-board",
        element: (
          <Protected authentication>
            {" "}
            <CreateBoard />
          </Protected>
        )
      },
      {
        path: "/your-boards",
        element: (
          <Protected authentication>
            {" "}
            <AllBoards />
          </Protected>
        )
      },
      {
        path: "join-board",
        element: (
          <Protected authentication>
            {" "}
            <JoinBoard />
          </Protected>
        )
      },
      {
        path: "/board/:slug",
        element: <Board />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)