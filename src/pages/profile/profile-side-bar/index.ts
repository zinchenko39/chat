import Block from '../../../utils/Block';
import template from './index.pug';
import logo from '../../../assets/images/back-arrow.svg';

export class ProfileSideBar extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props, logo });
  }
}
