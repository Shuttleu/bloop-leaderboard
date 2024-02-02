import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { useLoaderData } from "react-router-dom";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import { User as UserModel } from "../Models/User";

export async function userLoader(id: string | undefined) {
  let user = {};
  try {
    const req = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`);
    user = await req.json();
  } catch (error) {
    return { user };
  }
  return { user };
}

const points = (user: UserModel) => {
  let points = 0;
  user.Achievements.forEach((achievement) => {
    points += achievement.points;
  });
  return points;
};

type UserDetails = {
  user: UserModel;
  bloopCount: number;
}

export default function User() {
  const { user } = useLoaderData() as { user: UserDetails };

  return (
    <>
      {user && user.user ? (
        <>
          <Typography variant="h4" gutterBottom align="center">
            {user.user.username} - {user.user.cardId}
          </Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Achievement</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Barks: {user.bloopCount}</TableCell>
                  <TableCell align="right">Points: {points(user.user)}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.user.Achievements.map((achievement, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="left">{achievement.name}</TableCell>
                      <TableCell>
                        {achievement.desc}
                      </TableCell>
                      <TableCell colSpan={2} align="right">{achievement.points}</TableCell>
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
