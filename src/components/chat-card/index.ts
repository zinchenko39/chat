import Block from '../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import { ChatCardProps } from './props';
import { store } from '../../utils/Store';
import { ChatAvatar } from './components/chatAvatar';
import { chatController } from '../../controllers/ChatsController';
import avatar from '../../assets/images/avatar-man.svg';
import { connect } from '../../utils/connect';

export class ChatCard extends Block {
  constructor(props: ChatCardProps) {
    super(props);
  }

  showAvatar() {
    const avatarUrl = this.props.avatar;
    const baseUrl = 'https://ya-praktikum.tech/api/v2/resources';
    const fullAvatarUrl = avatarUrl ? `${baseUrl}${avatarUrl}` : avatar;
    this.children.avatar = new ChatAvatar({
      avatar: fullAvatarUrl,
      events: {
        change: (event) => this.handleChangeAvatar(event),
      },
    });
  }

  handleChangeAvatar(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('chatId', this.props.id.toString());
      chatController.changeChatAvatar(formData);
    } else {
      console.error('No file selected');
    }
  }

  render() {
    this.showAvatar();
    const activeChatId = store.getState()?.activeChatId;
    const classObj = {
      active: this.props.id === activeChatId,
    };

    return this.compile(template, { ...this.props, styles, classObj });
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(ChatCard);
