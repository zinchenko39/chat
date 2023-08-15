import Block from '../../../../../../utils/Block';
import template from './index.pug';
import sendLogo from '../../../../../../assets/images/send-btn.svg';

interface ISendButton {
  events?: { click: (event: PointerEvent) => void };
}

export class SendButton extends Block {
  constructor(props: ISendButton) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, sendLogo });
  }
}
