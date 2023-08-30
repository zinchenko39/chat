import Block from '../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import { MessageProps } from './props';
import checkedBlueLogo from '../../assets/images/checked-blue.svg';
import checkedGreyLogo from '../../assets/images/checked-grey.svg';

const images = {
  checkedBlueLogo,
  checkedGreyLogo,
};

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles, ...images });
  }
}
