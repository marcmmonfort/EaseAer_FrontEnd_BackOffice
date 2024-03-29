export interface User {
  uuid: string;
  appUser: string;
  nameUser: string;
  surnameUser: string;
  mailUser:string;
  passwordUser: string;
  photoUser: string;
  birthdateUser: string;
  genderUser: string;
  descriptionUser: string;
  roleUser: string;
  privacyUser: boolean;
  recordGameUser: number;
  flightsUser: string[];
  deletedUser: boolean;
  createdAt: string;
  updatedAt: string;
}
  