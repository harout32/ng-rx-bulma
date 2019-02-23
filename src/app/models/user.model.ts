export interface User {
  id: number;
  name: string;
  password: string;
  age: number;
  dateOfBirth: string;
  dayOfNextNotification: string;
  dayOfLogin: string;
  admin: boolean;
}

export interface UserEdit {
  name: string;
  age: number;
  dateOfBirth: string;
  dayOfNextNotification: string;
  dayOfLogin: string;
}
