import * as React from "react";
import Container from "@mui/material/Container";
import AppDrawer from "./Components/AppDrawer";
import User, { userLoader } from "./Components/User";
import Users, { usersLoader } from "./Components/Users";
import ErrorPage from "./Components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Leaderboard, { leaderboardLoader } from "./Components/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppDrawer />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <div>Home</div>,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: "user/:id",
        element: <User />,
        loader: userLoader,
      },
      {
        path: "leader",
        element: <Leaderboard />,
        loader: leaderboardLoader,
      },
    ],
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <Container maxWidth="xl">
        <RouterProvider router={router} />
      </Container>
    </React.StrictMode>
  );
}
