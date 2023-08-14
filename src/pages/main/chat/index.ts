import Block from '../../../utils/Block';
import { ChatFooter } from './footer';
import ChatHeader from './header';
import template from './index.pug';
import styles from './index.scss';
import ChatMessages from './messages';
import { connect } from '../../../utils/connect';
import { store } from '../../../utils/Store';

interface IChat {
  show: boolean;
  chatId: number;
}
class Chat extends Block {
  constructor(props: IChat) {
    super({
      ...props,
    });
  }

  init() {
    this.children.header = new ChatHeader();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.children.messages = new ChatMessages(store.getState()?.messages || []);
    this.children.footer = new ChatFooter();
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(Chat);
