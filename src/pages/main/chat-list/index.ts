import { Button } from '../../../components/button';
import { ChatCard } from '../../../components/chat-card';
import InputWrapper from '../../../components/input-wrapper';
import Block from '../../../utils/Block';
import template from './index.pug';
import { IChat } from '../../../interfaces/Store';
import { store } from '../../../utils/Store';
import { connect } from '../../../utils/connect';
import { chatController } from '../../../controllers/ChatsController';
import styles from './index.scss';
import { Modal } from '../../../components/modal';

class ChatList extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.search = new InputWrapper({
      name: 'search',
      label: 'Поиск',
      placeholder: 'Введите имя чата для поиска',
      type: 'text',
      width: '100%',
      textAlign: 'left',
      events: {
        change: (event: Event) =>
          store.set({ chatsFilter: (event.target as HTMLInputElement).value }),
      },
    });
    this.children.password = new InputWrapper({
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
    });
    this.children.button = new Button({
      text: 'Профиль >',
      width: '100px',
    });
    this.children.newChatButton = new Button({
      text: 'Новый чат',
      width: '100px',
      bgColor: '#49cc90',
      events: {
        click: () => this.openModal(),
      },
    });
    this.children.modal = new Modal({
      view: 'newChat',
      sendFunction: (inputValue: string) => this.sendDataToServer(inputValue),
    });
  }

  openModal() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.children.modal.togle();
  }

  sendDataToServer(inputValue: string) {
    const data = {
      title: inputValue,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chatController.createChat(data, this.children.modal.hide());
  }

  renderChats(chats: IChat[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const filteredChats = chats.filter((chat) => chat.title.match(store.getState().chatsFilter));
    return filteredChats.map(
      (chat) =>
        new ChatCard({
          id: chat.id,
          title: chat.title,
          last_message: chat?.last_message?.content || '',
          time: '',
          avatar: chat.avatar,
          qtyNewMsg: chat.unread_count,
          events: {
            click: () => {
              chatController.selectChat(chat.id);
            },
          },
        }),
    );
  }

  render() {
    this.children.chats = this.renderChats(store.getState()?.chats || []);
    return this.compile(template, { ...this.props, styles });
  }
}

export default connect(ChatList);
