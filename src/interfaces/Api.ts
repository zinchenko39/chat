export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface IUserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface ICreateChatData {
  title: string;
}

export interface IMessage {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: string | null;
}

export interface IResponse<TResponseData = any> {
  status: number;
  data: TResponseData;
}

export interface DeleteChatData extends Record<string, number> {
  chatId: number;
}

export interface DeletedChatResponse extends Record<string, unknown> {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
}

export interface ChangeUsersData extends Record<string, number | number[]> {
  users: number[];
  chatId: number;
}
export interface GetChatUsersData extends Record<string, number | number[]> {
  id: number;
}
