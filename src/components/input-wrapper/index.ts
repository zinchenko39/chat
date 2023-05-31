import Block from '../../utils/Block';
import { Input } from '../input';
import template from './index.pug';
import styles from './index.scss';
import { InputWrapperProps } from './props';

export class InputWrapper extends Block {
  constructor(props: InputWrapperProps) {
    super(props);
  }

  init() {
    this.children.input = new Input({
      name: this.props.name,
      placeholder: this.props.placeholder,
      type: this.props.type,
      textAlign: this.props.textAlign,
      events: this.props.events,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
