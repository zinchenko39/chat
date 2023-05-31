import { InputWrapper } from '../../../../components/input-wrapper';
import Block from '../../../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import clipLogo from '../../../../assets/images/clip.svg';
import plusLogo from '../../../../assets/images/photo-video.svg';
import fileLogo from '../../../../assets/images/file.svg';
import locationLogo from '../../../../assets/images/location.svg';
import sendLogo from '../../../../assets/images/send-btn.svg';

const images = {
  clipLogo,
  plusLogo,
  fileLogo,
  locationLogo,
  sendLogo,
};
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
      width: '98%',
      gap: 1,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles, ...images });
  }
}
