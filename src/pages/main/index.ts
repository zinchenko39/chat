import Block from '../../utils/Block/Block';
import Chat from './chat';
import ChatList from './chat-list';
import template from './index.pug';
import { chatController } from '../../controllers/ChatsController';
import styles from './index.scss';
import { store } from '../../utils/Store';
import { connect } from '../../utils/connect';

class MainPage extends Block {
  constructor() {
    super({});
  }
  init() {
    chatController.getChats();
    this.children.chatList = new ChatList();
    this.children.chat = new Chat({ show: false });
  }

  showChat() {
    const activeChatId = store.getState().activeChatId;
    if (activeChatId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.children.chat.setProps({ show: true, chatId: activeChatId });
    }
  }

  render() {
    this.showChat();
    return this.compile(template, { ...this.props, styles });
  }
}

export default connect(MainPage);
