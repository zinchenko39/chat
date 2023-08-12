import Block from '../../utils/Block';
import template from './index.pug';
import { AvatarLogoProps } from './props';

export class AvatarLogo extends Block {
  constructor(props: AvatarLogoProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
