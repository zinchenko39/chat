import Block from '../../../../../../utils/Block';
import template from './index.pug';
import plusLogo from '../../../../../../assets/images/plus-round.svg';

const images = {
  plusLogo,
};
interface AddUserButtonProps {
  events?: { click: (event: PointerEvent) => void };
}

export class AddUserButton extends Block {
  constructor(props: AddUserButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, ...images });
  }
}
