import Block from '../../../../../../utils/Block';
import template from './index.pug';

interface IDeleteChatButtonProps {
  events?: { click: (event: PointerEvent) => void };
}

export class DeleteChatButton extends Block {
  constructor(props: IDeleteChatButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
