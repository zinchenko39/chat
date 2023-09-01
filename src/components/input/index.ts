import Block from '../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import { InputProps } from './props';

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default Input;
