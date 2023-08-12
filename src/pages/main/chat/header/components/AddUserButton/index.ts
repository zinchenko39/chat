import Block from '../../../../../../utils/Block';
import template from './index.pug';

interface IAddUserButtonProps {
  events?: { click: (event: PointerEvent) => void };
}

export class AddUserButton extends Block {
  constructor(props: IAddUserButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
