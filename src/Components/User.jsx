import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { useLoaderData } from "react-router-dom";
import {
  Tab,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";

import axios from "axios";
export async function userLoader({ params }) {
  let user = {};
  try {
    const req = await axios.get(`http://localhost:3000/user/${params.id}`);
    user = req.data;
    console.log(user);
  } catch (error) {}
  return { user };
}

const points = (user) => {
  let points = 0;
  user.Achievements.forEach((achievement) => {
    points += achievement.points;
  });
  return points;
};

export default function User(props) {
  const { user } = useLoaderData();
  console.log(user);

  return (
    <>
      {user ? (
        <>
          <Typography variant="h4" gutterBottom align="center">
            {user.username} - {user.cardId}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Achievement</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Points: {points(user)}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.Achievements.map((achievement) => {
                  return (
                    <TableRow>
                      <TableCell align="left">{achievement.name}</TableCell>
                      <TableCell>
                        {achievement.hidden ? "Secret" : achievement.desc}
                      </TableCell>
                      <TableCell align="right">{achievement.points}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </>
  );
}
