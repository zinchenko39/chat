import Block from '../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import { MessageProps } from './props';

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
