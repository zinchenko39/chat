import Block from '../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import { ButtonProps } from './props';

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
