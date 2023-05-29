import { InputWrapper } from '../../../../components/input-wrapper';
import Block from '../../../../utils/Block';
import template from './index.pug';
import styles from './index.scss';

export class ChatFooter extends Block {
  constructor() {
    super({});
  }
  init() {
    this.children.message = new InputWrapper({
      name: 'message',
      label: ' ',
      placeholder: 'Сообщение',
      type: 'text',
      width: 100,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
