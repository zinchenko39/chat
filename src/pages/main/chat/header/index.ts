import Block from '../../../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import avatarLogo from '../../../../assets/images/avatar-man.svg';
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

const images = {
  avatarLogo,
  pointsLogo,
  plusLogo,
  deleteUserLogo,
  cleanLogo,
};

export class ChatHeader extends Block {
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
            sendFunction: (inputValue: string) => this.deleteChat(),
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

  render() {
    return this.compile(template, { ...this.props, styles, ...images, show: this.props.show });
  }
}
