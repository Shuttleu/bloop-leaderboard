import { List, ListItem } from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";

import Paper from "@mui/material/Paper";

import axios from "axios";
export async function leaderboardLoader() {
  let users = [];
  try {
    const req = await axios.get("http://localhost:3000/users/achievements");
    users = req.data;
    console.log(users);
  } catch (error) {}
  return { users };
}

const getStats = (user) => {
  let points = 0;
  let lastAchievement = null;
  user.Achievements.forEach((achievement) => {
    points += achievement.points;
    console.log(achievement.UserAchievements.createdAt);
    if (
      lastAchievement == null ||
      lastAchievement < achievement.UserAchievements.createdAt
    ) {
      lastAchievement = achievement.UserAchievements.createdAt;
    }
  });
  return { points: points, lastAchievement: lastAchievement };
};

const calculteScores = (users) => {
  return users.map((user) => {
    return { username: user.username, stats: getStats(user) };
  });
};

export default function Leaderboard() {
  const { users } = useLoaderData();
  console.log(users);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calculteScores(users)
              .sort((user1, user2) => {
                return (
                  Date.parse(user1.stats.lastAchievement) -
                  Date.parse(user2.stats.lastAchievement)
                );
              })
              .sort((user1, user2) => {
                return user2.stats.points - user1.stats.points;
              })
              .map((user) => {
                console.log(user);
                return (
                  <TableRow>
                    <TableCell>{user.username}</TableCell>
                    <TableCell align="right">{user.stats.points}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
