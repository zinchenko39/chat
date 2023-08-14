import { ChatApi } from '../api';
import { store } from '../utils/Store';
import { IChat, IChatList } from '../interfaces/Store';
import { ICreateChatData } from '../interfaces/Api';
import { messagesController } from './MessagesControllers';

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

  public getChatUsers(chatId: number): void {
    this.apiChat
      .getChatUsers({ id: chatId })
      .then((users: IChatList[]) => {
        store.set({ userList: users });
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

  public changeChatAvatar(data: FormData): void {
    this.apiChat
      .updateAvatar(data)
      .then(() => {
        chatController.getChats();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public selectChat(id: number): void {
    if (id) {
      this.apiChat
        .getToken(id)
        .then(({ token }) => {
          const userId = store.getState().user?.id || 0;
          messagesController.connect(userId, id, token);
          chatController.getChatUsers(id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    store.set({ activeChatId: id });
  }
}

export const chatController = new ChatsController();
