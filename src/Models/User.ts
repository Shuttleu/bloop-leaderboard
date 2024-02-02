import { Achievement } from "./Achievement";

export interface User {
  id: number;
  username: string;
  uid: string;
  cardId: number;
  Achievements: Achievement[];
}
