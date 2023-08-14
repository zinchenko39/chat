import { IUser, IMessage } from './Api';

export interface ILastMessage {
  user: {
    first_name: string;
    second_name: string;
    avatar: string;
    login: string;
  };
  time: string;
  content: string;
}

export interface IChat {
  avatar: string | null;
  id: number;
  created_by: number;
  last_message: ILastMessage;
  title: string;
  unread_count: number;
}

export interface IChatList {
  avatar: string | null;
  display_name: string | null;
  first_name: string | null;
  id: number;
  role: string;
  second_name: string;
}

export interface IState {
  user?: IUser;
  userList?: IChatList[];
  activeChatId?: number;
  chats?: IChat[];
  chatsToken?: {
    data?: {
      token: string;
    };
  };
  messages?: IMessage[];
  chatsFilter?: string;
}
