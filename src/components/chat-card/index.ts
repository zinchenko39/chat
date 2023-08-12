import Block from '../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import { ChatCardProps } from './props';
import { store } from '../../utils/Store';

export class ChatCard extends Block {
  constructor(props: ChatCardProps) {
    super(props);
  }

  render() {
    const activeChatId = store.getState()?.activeChatId;

    const classObj = {
      active: this.props.id === activeChatId,
    };

    return this.compile(template, { ...this.props, styles, classObj });
  }
}
