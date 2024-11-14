import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/state/store"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./common/components/ErrorPage/ErrorPage"
import App from "./app/App"
import { Login } from "features/Login/ui/Login"
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/404" />,
    children: [
      {
        index: true,
        element: <Navigate to="/todolists" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/todolists",
        element: <TodolistsList />,
      },
    ],
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,

)

