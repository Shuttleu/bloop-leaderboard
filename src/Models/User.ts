import { Achievement } from "./Achievement";

export default interface User {
  id: number;
  username: string;
  uid: string;
  cardId: number;
  Achievements: Achievement[];
}
