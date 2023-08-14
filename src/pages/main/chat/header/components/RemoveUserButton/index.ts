import Block from '../../../../../../utils/Block';
import template from './index.pug';

interface IRemoveUserButtonProps {
  events?: { click: (event: PointerEvent) => void };
}

export class RemoveUserButton extends Block {
  constructor(props: IRemoveUserButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
