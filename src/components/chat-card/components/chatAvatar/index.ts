import Block from '../../../../utils/Block';
import template from './index.pug';
import { IChatAvatarProps } from './props';
import { connect } from '../../../../utils/connect';

export class ChatAvatar extends Block {
  constructor(props: IChatAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(ChatAvatar);
