export type User = {
  id:number
  username: string;
  email: string;
  password: string;
  rpassword: string;
  role: string;
  img: string;
};

export type CheckUser = {
  id: number;
  username: string;
  email: string;
  role: string;
};


export type UserAndId = User & { id: number };
export type UserId = {
  id:number
}


export type UserWithoutName = Omit<User, 'username'>;
export type UserWithoutNameAndRpassword = Omit<UserWithoutName, 'rpassword'>;
export type UserWithoutNameAndRpasswordAndRole = Omit<UserWithoutNameAndRpassword, 'role'>;

export type StateAuth = {
  user: User
  message: string | undefined;
};
