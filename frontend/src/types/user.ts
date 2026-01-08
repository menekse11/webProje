export type UserRole = "admin" | "user";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
}
