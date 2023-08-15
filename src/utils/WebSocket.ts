import { EventBus } from './EventBus';
import { WsEvents, WsMessagesT } from '../interfaces/Api';

export default class WsTransport extends EventBus {
  private socket: WebSocket | null = null;

  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(private url: string) {
    super();
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.ping();

    return new Promise((resolve) => {
      this.on(WsEvents.CONNECTED, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('WebSocket does not exist!');
    }

    this.socket.send(JSON.stringify(data));
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WsEvents.CONNECTED);
    });

    socket.addEventListener('close', () => {
      this.emit(WsEvents.CLOSE);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WsEvents.ERROR, e);
    });

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data);

        if (data.type && (data.type === 'pong' || data.type === 'user connected')) {
          return;
        }

        this.emit(WsEvents.MESSAGE, data);
      } catch (e) {
        console.log(e);
      }
    });
  }

  private ping() {
    this.interval = setInterval(() => {
      this.send({ type: WsMessagesT.PING });
    }, 5000);

    this.on(WsEvents.CLOSE, () => {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    });
  }
}
