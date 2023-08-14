import { store } from '../utils/Store';
import WsTransport from '../utils/WebSocket';
import { IMessage, WsEvents } from '../interfaces/Api';

class MessagesController {
  private ws: WsTransport | null = null;

  async connect(userId: number, id: number, token: string) {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.ws = new WsTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

    await this.ws.connect();

    this.subscribe();
    this.getOldMessages();
  }

  send(message: string) {
    this.ws?.send({
      type: 'message',
      content: message,
    });
  }

  sendFile(id: number) {
    this.ws?.send({
      type: 'file',
      content: id,
    });
  }

  getOldMessages() {
    this.ws?.send({ type: 'get old', content: '0' });
  }

  private onMessage(messages: IMessage | IMessage[]) {
    if (Array.isArray(messages)) {
      store.set({ messages });
    } else {
      const newMessages = store.getState().messages;
      newMessages?.unshift(messages);
      store.set({ messages: newMessages });
    }
  }

  private subscribe() {
    this.ws?.on(WsEvents.MESSAGE, (message: IMessage | IMessage[]) => this.onMessage(message));
  }
}

export const messagesController = new MessagesController();
