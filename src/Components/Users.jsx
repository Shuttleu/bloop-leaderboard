import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

export async function usersLoader() {
  let users = [];
  try {
    const req = await axios.get("http://localhost:3000/users");
    users = req.data;
    console.log(users);
  } catch (error) {}
  return { users };
}

export default function Users() {
  const [search, setSearch] = useState("");

  const { users } = useLoaderData();

  const navigate = useNavigate();

  const searchChanged = (event) => {
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
          .map((user) => {
            return (
              <ListItemButton>
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
