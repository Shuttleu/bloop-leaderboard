export interface Achievement {
  name: string;
  desc: string;
  hidden: boolean;
  points: number;
  UserAchievements: UserAchievement;
}

export interface UserAchievement {
  createdAt: string;
}
