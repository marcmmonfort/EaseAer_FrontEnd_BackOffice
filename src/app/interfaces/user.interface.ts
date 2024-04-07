export interface User {
    uuid?: string;
    appUser: string;
    nameUser: string;
    surnameUser: string;
    mailUser:string;
    photoUser: string;
    birthdateUser: Date;
    genderUser: string;
    descriptionUser: string;
    roleUser: string;
    privacyUser: boolean;
    recordGameUser: number;
    flightsUser: [string];
    deletedUser: boolean;
    createdAt: string;
    updatedAt: string;
}