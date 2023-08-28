import Block from '../../utils/Block/Block';
import template from './index.pug';
import { AvatarLogoProps } from './props';
import { connect } from '../../utils/connect';

export class AvatarLogo extends Block {
  constructor(props: AvatarLogoProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(AvatarLogo);
