import Block from '../../../../utils/Block';
import template from './index.pug';
import styles from './index.scss';

export class ChatHeader extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
