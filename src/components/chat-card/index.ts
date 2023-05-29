import Block from '../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import { ChatCardProps } from './props';

export class ChatCard extends Block {
  constructor(props: ChatCardProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
