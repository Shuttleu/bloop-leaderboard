import * as React from 'react';
import Container from '@mui/material/Container';
import AppDrawer from './AppDrawer';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/users",
    element: <div>User page</div>,
  },
  {
    path: "/leader",
    element: <div>Leaderboard</div>,
  },
]);

export default function App() {
  return (
    <Container maxWidth="xl">
        <AppDrawer>
          <RouterProvider router={router} />
        </AppDrawer>
    </Container>
  );
}
