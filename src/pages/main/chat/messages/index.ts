import { Message } from '../../../../components/message';
import Block from '../../../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import { store } from '../../../../utils/Store';
import { IMessage } from '../../../../interfaces/Api';
import { connect } from '../../../../utils/connect';
import { formatTime } from '../../../../utils/utils';

interface IChatMessages {
  text: string;
  time: string;
  userId: number;
}

class ChatMessages extends Block {
  constructor(props: IChatMessages) {
    super({
      ...props,
    });
  }

  init() {
    this.children.message = new Message({
      text: this.props.text,
      time: this.props.time,
      me: store.getState()?.user?.id === this.props.userId,
    });
  }

  renderMessages(messages: IMessage[]) {
    return messages.map(
      (message) =>
        new Message({
          text: message.content,
          time: formatTime(message.time) || '',
          me: store.getState()?.user?.id === message.user_id,
        }),
    );
  }

  render() {
    this.children.messages = this.renderMessages(store.getState()?.messages || []);
    return this.compile(template, { ...this.props, styles });
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(ChatMessages);
