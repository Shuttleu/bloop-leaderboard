import * as React from 'react';
import Container from '@mui/material/Container';
import AppDrawer from './Pages/AppDrawer';
import User, {userLoader} from './Pages/User';
import Users, {usersLoader} from './Pages/Users';
import ErrorPage from './Pages/ErrorPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppDrawer/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <div>Home</div>,
      },
      {
        path: "users",
        element: <Users/>,
        loader: usersLoader,
      },
      {
        path: "user/:id",
        element: <User/>,
        loader: userLoader,
      },
      {
        path: "leader",
        element: <div>Leaderboard</div>,
      },
    ],
  }
]);

export default function App() {
  return (
    <Container maxWidth="xl">
          <RouterProvider router={router} />
    </Container>
  );
}
