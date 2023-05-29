import Block from '../../../utils/Block';
import { ChatFooter } from './footer';
import { ChatHeader } from './header';
import template from './index.pug';
import styles from './index.scss';
import { ChatMessages } from './messages';

export class Chat extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.header = new ChatHeader();
    this.children.messages = new ChatMessages();
    this.children.footer = new ChatFooter();
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
