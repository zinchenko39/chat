import Block from '../../../../../../utils/Block/Block';
import template from './index.pug';
import clipLogo from '../../../../../../assets/images/clip.svg';

interface IAttachementsButton {
  events?: { click: (event: PointerEvent) => void };
}

export class AttachementsButton extends Block {
  constructor(props: IAttachementsButton) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, clipLogo });
  }
}
