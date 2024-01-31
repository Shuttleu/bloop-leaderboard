import { useLoaderData } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import User from "../Models/User";

import Paper from "@mui/material/Paper";

type Stats = {
  points: number;
  lastAchievement: string;
};

type CalculatedStats = {
  username: string;
  stats: Stats;
};

export async function leaderboardLoader() {
  let users = [];
  try {
    const req = await fetch(
      `${import.meta.env.VITE_API_URL}/users/achievements`,
    );
    users = await req.json();
  } catch (error) {
    return { users };
  }
  return { users };
}

const getStats = (user: User) => {
  let points = 0;
  let lastAchievement: string | null = null;
  user.Achievements.forEach((achievement) => {
    points += achievement.points;
    if (
      lastAchievement == null ||
      lastAchievement < achievement.UserAchievements.createdAt
    ) {
      lastAchievement = achievement.UserAchievements.createdAt;
    }
  });
  const stats: Stats = {
    points: points,
    lastAchievement: lastAchievement == null ? "" : lastAchievement,
  };
  return stats;
};

const calculteScores = (users: User[]) => {
  return users.map((user) => {
    const calculated: CalculatedStats = {
      username: user.username,
      stats: getStats(user),
    };
    return calculated;
  });
};

export default function Leaderboard() {
  const { users } = useLoaderData() as { users: User[] };

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
              .map((user, i) => {
                return (
                  <TableRow key={i}>
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
