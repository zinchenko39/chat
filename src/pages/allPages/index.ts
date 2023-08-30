import Block from '../../utils/Block/Block';
import template from './index.pug';
import { AllPagesProps } from './props';

export class AllPages extends Block {
  constructor(props: AllPagesProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
