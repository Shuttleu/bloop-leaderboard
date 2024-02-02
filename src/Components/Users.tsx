import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { User } from "../Models/User";

export async function usersLoader() {
  let users = [];
  try {
    const req = await fetch(`${import.meta.env.VITE_API_URL}/users`);
    users = await req.json();
  } catch (error) {
    return { users };
  }
  return { users };
}

export default function Users() {
  const [search, setSearch] = useState("");

  const { users } = useLoaderData() as { users: User[] };

  const navigate = useNavigate();

  const searchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={searchChanged}
      />
      <List>
        {users
          .filter((user) => {
            return user.username.toLowerCase().includes(search.toLowerCase());
          })
          .map((user, i) => {
            return (
              <ListItemButton key={i}>
                <ListItem
                  onClick={() => {
                    navigate(`/user/${user.id}`);
                  }}
                >
                  <ListItemText primary={user.username} />
                </ListItem>
              </ListItemButton>
            );
          })}
      </List>
    </>
  );
}
