import Block from '../../../../../../utils/Block/Block';
import template from './index.pug';

interface IChatUser {
  avatarUrl: string;
  name: string;
}

export class ChatUser extends Block {
  constructor(props: IChatUser) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
