import { ChatApi } from '../api';
import { store } from '../utils/Store';
import { IChat } from '../interfaces/Store';
import { ICreateChatData, ChangeUsersData } from '../interfaces/Api';

export class ChatsController {
  private readonly apiChat = new ChatApi();

  public getChats(): void {
    this.apiChat
      .getChats()
      .then((data: IChat[]) => {
        store.set({ chats: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public createChat(data: ICreateChatData, callback?: () => void): void {
    this.apiChat
      .createChat(data)
      .then(() => {
        if (callback) callback();
        this.getChats();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public addChatUser(userId: number, chatId: number, callback?: () => void): void {
    this.apiChat
      .addChatUser({ users: [userId], chatId })
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public removeChatUser(userId: number, chatId: number, callback?: () => void): void {
    this.apiChat
      .deleteChatUser({ users: [userId], chatId })
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public deleteChat(chatId: number, callback?: () => void): void {
    this.apiChat
      .deleteChat({ chatId })
      .then(() => {
        if (callback) callback();
        this.getChats();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export const chatController = new ChatsController();
