export interface IUser{
    _id?: string;
    name: string;
    email: string;
    password: string;
    gender: string;
    birthDate: string;
    area: string;
    photo: FileList;
    isAdmin: boolean; 
}

export interface IUserDados{
    _id?: string;
    name: string;
    email: string;
    password: string;
    gender: string;
    birthDate: string;
    area: string;
    photo: string | null;
    isAdmin: boolean; 
}