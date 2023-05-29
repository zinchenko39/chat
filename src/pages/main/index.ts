import Block from '../../utils/Block';
import { Chat } from './chat';
import { ChatList } from './chat-list';
import template from './index.pug';
import styles from './index.scss';

export class MainPage extends Block {
  constructor() {
    super({});
  }
  init() {
    this.children.chatList = new ChatList();
    this.children.chat = new Chat();
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
