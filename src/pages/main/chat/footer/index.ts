import InputWrapper from '../../../../components/input-wrapper';
import Block from '../../../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import clipLogo from '../../../../assets/images/clip.svg';
import plusLogo from '../../../../assets/images/photo-video.svg';
import fileLogo from '../../../../assets/images/file.svg';
import locationLogo from '../../../../assets/images/location.svg';
import { SendButton } from './components/SendButton';
import { messagesController } from '../../../../controllers/MessagesControllers';
import { AttachementsButton } from './components/AttacmentsButton';

const images = {
  clipLogo,
  plusLogo,
  fileLogo,
  locationLogo,
};
export class ChatFooter extends Block {
  constructor() {
    super({
      show: false,
    });
  }

  init() {
    this.children.message = new InputWrapper({
      name: 'message',
      label: ' ',
      placeholder: 'Сообщение',
      type: 'text',
      width: '98%',
      gap: 1,
    });
    this.children.sendButton = new SendButton({
      events: {
        click: () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const message = this.children.message.children.input.getValue();
          if (message) {
            messagesController.send(message);
          }
        },
      },
    });
    this.children.attachmetsButton = new AttachementsButton({
      events: {
        click: () => {
          this.setProps({ show: !this.props.show });
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles, ...images, show: this.props.show });
  }
}
