import { Block } from '../../utils/Block';
import template from './button.pug';

interface ButtonProps {
  label: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return template({ label: this.props.label });
  }
}
