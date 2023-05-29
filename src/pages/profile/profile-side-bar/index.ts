import Block from '../../../utils/Block';
import template from './index.pug';

export class ProfileSideBar extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
