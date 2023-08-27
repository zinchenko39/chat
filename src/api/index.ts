import { Api } from '../utils/HTTPTransport/HTTPTransport';
import {
  ISignInData,
  IResponse,
  ISignUpData,
  IUser,
  ICreateChatData,
  DeleteChatData,
  DeletedChatResponse,
  GetChatUsersData,
  ChangeUsersData,
} from '../interfaces/Api';
import { IChat, IChatList } from '../interfaces/Store';

export class AuthApi extends Api {
  constructor() {
    super('/auth');
  }

  async signIn<T>(data: ISignInData): Promise<IResponse<T>> {
    return await this.http.post('/signin', { data });
  }

  async signup<T>(data: ISignUpData): Promise<IResponse<T>> {
    return await this.http.post('/signup', { data });
  }
  async getUser(): Promise<IUser> {
    return await this.http.get('/user');
  }
  async getChats<T>(): Promise<IResponse<T>> {
    return await this.http.post('/chats');
  }

  async logout<T>(): Promise<IResponse<T>> {
    return await this.http.post('/logout');
  }
}

export class UserApi extends Api {
  constructor() {
    super('/user');
  }

  async setAvatar<T>(data: FormData): Promise<IResponse<T>> {
    return await this.http.put('/profile/avatar', { data });
  }

  async searchUser<T>(data: { login: string }): Promise<IResponse<T>> {
    return await this.http.post('/search', { data });
  }

  async changeProfile<T>(data: any): Promise<IResponse<T>> {
    return await this.http.put('/profile', { data });
  }

  async changePassword<T>(data: any): Promise<IResponse<T>> {
    return await this.http.put('/password', { data });
  }
}

export class ChatApi extends Api {
  constructor() {
    super('/chats');
  }

  async getChats<T>(): Promise<IChat[]> {
    return await this.http.get('');
  }

  async createChat<T>(data: ICreateChatData): Promise<IResponse<T>> {
    return await this.http.post('', { data });
  }

  async deleteChat(data: DeleteChatData): Promise<DeletedChatResponse> {
    return this.http.delete('', { data });
  }

  async getChatUsers(data: GetChatUsersData): Promise<IChatList[]> {
    return this.http.get(`/${data.id}/users`);
  }

  async addChatUser(data: ChangeUsersData) {
    return this.http.put('/users', { data });
  }

  async deleteChatUser(data: ChangeUsersData) {
    return this.http.delete('/users', { data });
  }

  async getUnreadCount(data: GetChatUsersData): Promise<{ unread_count: number }> {
    return this.http.get(`/new/${data.id}`);
  }

  async getToken(id: number): Promise<{ token: string }> {
    return this.http.post(`/token/${id}`);
  }

  async updateAvatar(data: FormData) {
    return this.http.put('/avatar', { data });
  }
}
