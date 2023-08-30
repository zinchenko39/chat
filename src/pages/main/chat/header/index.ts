import Block from '../../../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import avatar from '../../../../assets/images/avatar-man.svg';
import pointsLogo from '../../../../assets/images/three_points.svg';
import plusLogo from '../../../../assets/images/plus-round.svg';
import deleteUserLogo from '../../../../assets/images/close-round.svg';
import cleanLogo from '../../../../assets/images/garbage-round.svg';
import { AddUserButton } from './components/AddUserButton';
import { Modal } from '../../../../components/modal';
import { chatController } from '../../../../controllers/ChatsController';
import { store } from '../../../../utils/Store';
import { RemoveUserButton } from './components/RemoveUserButton';
import { DeleteChatButton } from './components/DeleteChatButton';
import { DotsMenu } from './components/DotsMenu';
import { ChatUser } from './components/ChatUser';
import { IChatList } from '../../../../interfaces/Store';
import { connect } from '../../../../utils/connect';

const images = {
  pointsLogo,
  plusLogo,
  deleteUserLogo,
  cleanLogo,
};

class ChatHeader extends Block {
  constructor() {
    super({ show: false });
  }

  init() {
    this.children.addUserButton = new AddUserButton({
      events: {
        click: () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.children.modal.setProps({
            view: 'addUser',
            sendFunction: (inputValue: string) => this.addChatUser(inputValue),
          });
          this.toggleModal();
        },
      },
    });
    this.children.removeUserButton = new RemoveUserButton({
      events: {
        click: () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.children.modal.setProps({
            view: 'removeUser',
            sendFunction: (inputValue: string) => this.removeChatUser(inputValue),
          });
          this.toggleModal();
        },
      },
    });
    this.children.deleteChatButton = new DeleteChatButton({
      events: {
        click: () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.children.modal.setProps({
            view: 'deleteChat',
            sendFunction: () => this.deleteChat(),
          });
          this.toggleModal();
        },
      },
    });
    this.children.modal = new Modal({
      view: '',
      show: true,
      sendFunction: () => {},
    });
    this.children.dotsMenu = new DotsMenu({
      events: {
        click: () => {
          this.setProps({ show: !this.props.show });
        },
      },
    });
  }

  addChatUser(inputValue: string) {
    const chatId = store.getState()?.activeChatId;
    if (chatId && inputValue)
      chatController.addChatUser(Number(inputValue), store.getState().activeChatId!, () =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.children.modal.hide(),
      );
  }

  removeChatUser(inputValue: string) {
    const chatId = store.getState()?.activeChatId;
    if (chatId && inputValue)
      chatController.removeChatUser(Number(inputValue), store.getState().activeChatId!, () =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.children.modal.hide(),
      );
  }

  deleteChat() {
    const chatId = store.getState()?.activeChatId;
    if (chatId)
      chatController.deleteChat(store.getState().activeChatId!, () =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.children.modal.hide(),
      );
  }

  toggleModal() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.children.modal.togle();
  }

  renderChatUsers(users: IChatList[]) {
    const baseUrl = 'https://ya-praktikum.tech/api/v2/resources';
    // const fullAvatarUrl = store?.getState().user?.avatar ? `${baseUrl}${avatarUrl}` : avatar;
    return users.map(
      (user) =>
        new ChatUser({
          avatarUrl: user.avatar ? `${baseUrl}${user.avatar}` : avatar,
          name: user.display_name || 'No name',
        }),
    );
  }

  render() {
    this.children.usersList = this.renderChatUsers(store.getState().userList || []);
    return this.compile(template, { ...this.props, styles, ...images, show: this.props.show });
  }
}

export default connect(ChatHeader);
